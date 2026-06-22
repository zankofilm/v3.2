const { app, BrowserWindow, ipcMain, shell, session } = require('electron');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

let win;

function ensureDir(p){ if(!fs.existsSync(p)) fs.mkdirSync(p,{recursive:true}); }
function dataDir(){ const d=path.join(app.getPath('userData'),'data'); ensureDir(d); return d; }
function stateFile(key){ return path.join(dataDir(), String(key||'admin').replace(/[^a-zA-Z0-9_-]/g,'_') + '_state.json'); }
function readJson(file){ try{ return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file,'utf8')) : null; }catch(e){ return null; } }
function writeJson(file,obj){ ensureDir(path.dirname(file)); fs.writeFileSync(file, JSON.stringify(obj||{}, null, 2), 'utf8'); }

const CLIENT_ACTIVATION_SECRET = 'JAVANROOD_NGO_CLIENT_ACTIVATION_SECRET_V1';
function canonicalJson(obj){
  if(obj === null || typeof obj !== 'object') return JSON.stringify(obj);
  if(Array.isArray(obj)) return '[' + obj.map(canonicalJson).join(',') + ']';
  const keys = Object.keys(obj).sort();
  return '{' + keys.map(k => JSON.stringify(k) + ':' + canonicalJson(obj[k])).join(',') + '}';
}
function base64UrlFromBuffer(buf){
  return Buffer.from(buf).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function sha256Hex(text){
  return crypto.createHash('sha256').update(String(text || ''), 'utf8').digest('hex');
}
function signActivationPayload(payload){
  return base64UrlFromBuffer(crypto.createHmac('sha256', CLIENT_ACTIVATION_SECRET).update(canonicalJson(payload), 'utf8').digest());
}


function createWindow(){
  win = new BrowserWindow({
    width: 1320,
    height: 860,
    minWidth: 1100,
    minHeight: 700,
    title: 'پنل ادمین سامانه سمن‌های شهرستان جوانرود',
    autoHideMenuBar: true,
    backgroundColor: '#f6faff',
    icon: path.join(__dirname, 'build', 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  win.loadFile(path.join(__dirname, 'admin_ui', 'index.html'));
  win.webContents.setWindowOpenHandler(({url}) => { shell.openExternal(url); return {action:'deny'}; });
}

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_wc, permission, callback) => {
    callback(['media','camera','microphone','display-capture'].includes(permission));
  });

  ipcMain.handle('native:loadState', async (_e,key) => {
    const f = stateFile(key || 'admin');
    return { ok:true, exists:fs.existsSync(f), state:readJson(f), path:f };
  });
  ipcMain.handle('native:saveState', async (_e,key,state) => {
    const f = stateFile(key || 'admin');
    writeJson(f,state||{});
    return { ok:true, path:f, updatedAt:new Date().toISOString() };
  });
  ipcMain.handle('native:backupState', async (_e,key,state) => {
    const dir = path.join(dataDir(),'backups'); ensureDir(dir);
    const f = path.join(dir, `${key||'admin'}_${new Date().toISOString().replace(/[:.]/g,'-')}.json`);
    writeJson(f,state||{});
    return { ok:true, path:f };
  });
  ipcMain.handle('native:openDataDir', async () => { shell.openPath(dataDir()); return {ok:true,path:dataDir()}; });
  ipcMain.handle('native:sha256Hex', async (_e, text) => sha256Hex(text));
  ipcMain.handle('native:signActivation', async (_e, payload) => signActivationPayload(payload || {}));
  ipcMain.handle('native:hashActivationPassword', async (_e, password, salt) => sha256Hex(String(salt || '') + '::' + String(password || '')));


  createWindow();
});

app.on('window-all-closed', () => { if(process.platform !== 'darwin') app.quit(); });
