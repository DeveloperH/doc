## win11 右键菜单

* 切换为win10右键菜单

  ```
  cmd 管理员
  
  reg add "HKEY_CURRENT_USER\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905ba5a62}\InprocServer32" /ve /t REG_SZ /d "" /f
  
  taskkill /f /im explorer.exe & start explorer.exe
  ```

* 恢复为win11右键菜单

  ```
  reg delete "HKEY_CURRENT_USER\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905ba5a62}" /f
  taskkill /f /im explorer.exe & start explorer.exe
  ```

  


























