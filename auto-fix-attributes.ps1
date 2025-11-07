# 安全自动化修复脚本 - 淮韵游踪架构师定制
Write-Host "🔧 启动安全修复协议..." -ForegroundColor Cyan

$fixedCount = 0

Get-ChildItem "src" -Recurse -Include "*.vue" | ForEach-Object {
    $file = $_
    $content = Get-Content $_.FullName -Raw
    
    if (-not $content) { return }
    
    $originalContent = $content
    
    # 只修复缺失id/name的表单元素，不修改其他内容
    $content = [regex]::Replace($content, '<(el-input|el-select|el-textarea|el-radio-group|el-checkbox|el-switch|el-rate)([^>]*)v-model="([^"]*)"', {
        param($match)
        
        $element = $match.Groups[1].Value
        $attributes = $match.Groups[2].Value  
        $vModel = $match.Groups[3].Value
        
        # 检查是否已存在id和name
        $hasId = $attributes -match '\sid='
        $hasName = $attributes -match '\sname='
        
        if (-not $hasId -or -not $hasName) {
            # 安全提取字段名 - 只取最后一部分
            $fieldName = $vModel -replace '^.*\.', '' -replace '\[.*\]', '' -replace '\].*', ''
            
            # 构建新属性 - 只在原有属性后追加
            $newAttributes = $attributes.Trim()
            
            if (-not $hasId) {
                $newAttributes += " id="$fieldName""
            }
            if (-not $hasName) {
                $newAttributes += " name="$fieldName""
            }
            
            $fixedCount++
            return "<$element$newAttributes v-model="$vModel""
        }
        
        return $match.Value
    })
    
    # 只有确实修改了才保存
    if ($content -ne $originalContent) {
        $content | Out-File -FilePath $file.FullName -Encoding UTF8
        Write-Host "✅ 安全修复: $($file.Name) (修改了 $($fixedCount) 个元素)" -ForegroundColor Green
        $fixedCount = 0
    }
}

Write-Host "
🎉 安全修复完成！" -ForegroundColor Cyan
