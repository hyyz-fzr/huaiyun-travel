# 图片路径修复工具
function Repair-ImagePaths {
    param($FilePath)
    
    $content = Get-Content $FilePath -Raw
    # 将 /images/heritage/ 替换为正确的导入方式
    $newContent = $content -replace 'src="(/images/heritage/([^"]+))"', 'src="$2"'
    
    if ($content -ne $newContent) {
        # 需要添加import语句
        $images = [regex]::Matches($content, '/images/heritage/([^"]+)') | 
                  ForEach-Object { $_.Groups[1].Value } |
                  Get-Unique
        
        $importStatements = ""
        foreach ($img in $images) {
            $varName = $img -replace '\.jpg|\.png', '' -replace '-', '_'
            $importStatements += "import $varName from '@/assets/images/heritage/$img'`n"
        }
        
        # 在script setup部分添加import
        if ($newContent -match '<script setup>') {
            $newContent = $newContent -replace '<script setup>', "<script setup>`n$importStatements"
        }
        
        # 更新文件
        $newContent | Out-File $FilePath -Encoding UTF8
        Write-Host "✅ 修复完成: $FilePath" -ForegroundColor Green
    }
}

# 执行修复
$files = Get-ChildItem "D:\Users\Administrator\Downloads\huaiyun-travel\src" -Recurse -Include "*.vue"
foreach ($file in $files) {
    Repair-ImagePaths -FilePath $file.FullName
}
