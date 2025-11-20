mkdir -p src/reports/fonts

# Descargar fuentes Roboto correctas desde Google Fonts (raw)
curl -L -o src/reports/fonts/Roboto-Regular.ttf     https://github.com/google/fonts/raw/main/apache/roboto/Roboto-Regular.ttf

curl -L -o src/reports/fonts/Roboto-Bold.ttf        https://github.com/google/fonts/raw/main/apache/roboto/Roboto-Bold.ttf

curl -L -o src/reports/fonts/Roboto-Italic.ttf      https://github.com/google/fonts/raw/main/apache/roboto/Roboto-Italic.ttf

curl -L -o src/reports/fonts/Roboto-BoldItalic.ttf  https://github.com/google/fonts/raw/main/apache/roboto/Roboto-BoldItalic.ttf

echo "Fuentes Roboto descargadas correctamente en src/reports/fonts/"