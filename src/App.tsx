import { useState, useRef, useCallback } from 'react'

function App() {
  const [images, setImages] = useState<(string | null)[]>([null, null, null])
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null)
  const [showCode, setShowCode] = useState(false)
  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImages = [...images]
        newImages[index] = e.target?.result as string
        setImages(newImages)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = useCallback((index: number, event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImages = [...images]
        newImages[index] = e.target?.result as string
        setImages(newImages)
      }
      reader.readAsDataURL(file)
    }
  }, [images])

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages[index] = null
    setImages(newImages)
    if (fileInputRefs[index].current) {
      fileInputRefs[index].current.value = ''
    }
  }

  const allImagesLoaded = images.every(img => img !== null)

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Header */}
      <header className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
        
        {/* Partículas decorativas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Suas 3 Imagens → 1 Unidade
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Faça upload das suas 3 imagens abaixo e veja como elas se unem
            formando uma composição perfeita em qualquer dispositivo.
          </p>
        </div>
      </header>

      {/* Área de Upload */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            📸 Envie suas <span className="text-amber-400">3 Imagens</span>
          </h2>
          <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
            Arraste e solte ou clique para selecionar. As imagens devem ter bordas que se complementam.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <input
                  type="file"
                  ref={fileInputRefs[index]}
                  onChange={(e) => handleImageUpload(index, e)}
                  accept="image/*"
                  className="hidden"
                  id={`upload-${index}`}
                />
                
                {img ? (
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/50 bg-gray-800">
                      <img
                        src={img}
                        alt={`Imagem ${index + 1}`}
                        className="w-full h-48 md:h-56 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-amber-500 text-black font-bold px-3 py-1 rounded-full text-xs">
                        Imagem {index + 1}
                      </div>
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      >
                        ✕
                      </button>
                      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-green-400 text-sm font-medium">✓ Carregada</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor={`upload-${index}`}
                    onDrop={(e) => handleDrop(index, e)}
                    onDragOver={handleDragOver}
                    className="relative flex flex-col items-center justify-center h-48 md:h-56 border-2 border-dashed border-gray-600 hover:border-amber-500 rounded-2xl cursor-pointer transition-all duration-300 bg-gray-800/50 hover:bg-gray-800 group"
                  >
                    <div className="text-center p-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 group-hover:bg-amber-500/20 rounded-full flex items-center justify-center transition-colors">
                        <svg className="w-8 h-8 text-gray-400 group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-400 group-hover:text-amber-400 font-medium transition-colors">
                        Imagem {index + 1}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Clique ou arraste
                      </p>
                    </div>
                  </label>
                )}
              </div>
            ))}
          </div>

          {/* Botão de demonstração */}
          {allImagesLoaded && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 text-green-400 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">Todas as 3 imagens carregadas! Role para ver o resultado ↓</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Resultado - Composição Unificada */}
      {allImagesLoaded && (
        <section className="py-12 md:py-20 px-4 bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ✨ Resultado: <span className="text-amber-400">Composição Unificada</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Passe o mouse sobre os painéis para ver cada imagem individualmente.
                As 3 imagens juntas formam uma unidade visual perfeita.
              </p>
            </div>

            {/* Composição principal */}
            <div
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => { setIsHovered(false); setHoveredPanel(null) }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-amber-500/10">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden transition-all duration-500 ease-out"
                      style={{
                        transform: isHovered && hoveredPanel === index ? 'scale(1.02)' : 'scale(1)',
                        zIndex: isHovered && hoveredPanel === index ? 10 : 1,
                      }}
                      onMouseEnter={() => setHoveredPanel(index)}
                    >
                      <img
                        src={img!}
                        alt={`Painel ${index + 1}`}
                        className="w-full h-auto object-cover transition-all duration-500"
                        style={{
                          filter: isHovered && hoveredPanel !== null && hoveredPanel !== index
                            ? 'brightness(0.7) saturate(0.8)'
                            : 'brightness(1) saturate(1)',
                        }}
                      />
                      <div
                        className="absolute inset-0 flex items-end justify-start transition-opacity duration-300"
                        style={{
                          opacity: isHovered && hoveredPanel === index ? 1 : 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%)',
                        }}
                      >
                        <span className="m-4 bg-amber-500/90 text-black font-bold px-4 py-2 rounded-full text-sm">
                          Imagem {index + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Linhas divisórias */}
                <div
                  className="absolute inset-y-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    left: '33.333%',
                    width: '2px',
                    background: 'linear-gradient(to bottom, transparent, rgba(251, 191, 36, 0.8), transparent)',
                  }}
                />
                <div
                  className="absolute inset-y-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    left: '66.666%',
                    width: '2px',
                    background: 'linear-gradient(to bottom, transparent, rgba(251, 191, 36, 0.8), transparent)',
                  }}
                />
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
                <span className="text-amber-400 text-sm font-medium px-4 py-2 border border-amber-500/30 rounded-full">
                  ✨ 3 imagens independentes = 1 composição unificada
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Visualização separada */}
      {allImagesLoaded && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              🔍 Cada Imagem <span className="text-amber-400">Individualmente</span>
            </h2>
            <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
              Veja como cada imagem funciona sozinha e como se conecta com as outras.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative overflow-hidden rounded-2xl border-2 border-gray-700 group-hover:border-amber-500/50 transition-colors">
                    <img src={img!} alt={`Imagem ${index + 1}`} className="w-full h-auto object-cover" />
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-amber-400 font-bold text-lg">Imagem {index + 1}</span>
                      <p className="text-gray-300 text-sm">Funciona sozinha e em conjunto</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Código necessário */}
      {allImagesLoaded && (
        <section className="py-12 px-4 bg-gray-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                💻 Código para usar no seu projeto
              </h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-full transition-colors"
              >
                {showCode ? 'Ocultar código' : 'Mostrar código'}
              </button>
            </div>

            {showCode && (
              <div className="bg-gray-900 rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-gray-400 text-sm">composicao.css</span>
                </div>
                <pre className="p-6 overflow-x-auto text-sm">
                  <code className="text-gray-300">
{`/* Container principal - sem gaps! */`}
{'\n'}
<span className="text-purple-400">.unidade-visual</span> {`{`}
{'\n  '}
<span className="text-cyan-400">display</span>: <span className="text-amber-300">grid</span>;
{'\n  '}
<span className="text-cyan-400">grid-template-columns</span>: <span className="text-amber-300">repeat(3, 1fr)</span>;
{'\n  '}
<span className="text-cyan-400">gap</span>: <span className="text-amber-300">0</span>;  <span className="text-green-400">/* ← Sem espaço entre imagens */</span>
{'\n  '}
<span className="text-cyan-400">width</span>: <span className="text-amber-300">100%</span>;
{'\n  '}
<span className="text-cyan-400">overflow</span>: <span className="text-amber-300">hidden</span>;
{'\n'}
{`}`}
{'\n\n'}
{`/* Cada imagem */`}
{'\n'}
<span className="text-purple-400">.unidade-visual img</span> {`{`}
{'\n  '}
<span className="text-cyan-400">width</span>: <span className="text-amber-300">100%</span>;
{'\n  '}
<span className="text-cyan-400">height</span>: <span className="text-amber-300">auto</span>;
{'\n  '}
<span className="text-cyan-400">display</span>: <span className="text-amber-300">block</span>;
{'\n  '}
<span className="text-cyan-400">object-fit</span>: <span className="text-amber-300">cover</span>;
{'\n'}
{`}`}
{'\n\n'}
{`/* Mobile: empilha verticalmente */`}
{'\n'}
<span className="text-pink-400">@media</span> (<span className="text-cyan-400">max-width</span>: <span className="text-amber-300">768px</span>) {`{`}
{'\n  '}
<span className="text-purple-400">.unidade-visual</span> {`{`}
{'\n    '}
<span className="text-cyan-400">grid-template-columns</span>: <span className="text-amber-300">1fr</span>;
{'\n  '}
{`}`}
{'\n'}
{`}`}
                  </code>
                </pre>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Dicas */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            💡 Dicas para suas imagens
          </h2>

          <div className="space-y-4">
            {[
              {
                icon: '🎨',
                title: 'Planeje as bordas',
                desc: 'As bordas direita e esquerda das imagens devem se conectar. Use Photoshop ou similar para dividir uma imagem panorâmica em 3 partes.',
              },
              {
                icon: '📐',
                title: 'Mesma altura',
                desc: 'Todas as imagens devem ter a mesma altura para ficarem alinhadas perfeitamente.',
              },
              {
                icon: '📱',
                title: 'Teste em mobile',
                desc: 'Em telas pequenas as imagens empilham. Verifique se cada imagem funciona bem sozinha.',
              },
              {
                icon: '⚡',
                title: 'Otimize o tamanho',
                desc: 'Use imagens otimizadas (WebP, compressão) para carregamento rápido em qualquer dispositivo.',
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 bg-gray-800/50 rounded-xl border border-gray-700/30 hover:border-amber-500/30 transition-colors"
              >
                <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{tip.title}</h3>
                  <p className="text-gray-400 text-sm">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            CSS Grid + object-fit: cover = Composição visual perfeita em qualquer dispositivo
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
