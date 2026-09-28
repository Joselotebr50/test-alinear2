import { useState, useEffect, useRef } from 'react'

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const images = [
    'https://image.qwenlm.ai/generated-images/e32ed295-8a96-45ff-b34a-697f8d4a82f3/_result.png',
    'https://image.qwenlm.ai/generated-images/176ed32c-bd0c-4ff7-ba25-96fd6868d5da/_result.png',
    'https://image.qwenlm.ai/generated-images/b7344ac6-8594-4704-afef-2455aab4475a/_result.png',
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            3 Imagens → 1 Unidade
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Aprenda como fazer imagens independentes se complementarem visualmente,
            formando uma composição unificada em qualquer dispositivo.
          </p>
          <div className="flex items-center justify-center gap-2 text-amber-400 animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-sm">Role para ver a demonstração</span>
          </div>
        </div>
      </header>

      {/* Main Demo Section */}
      <section className="relative py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              A Técnica: <span className="text-amber-400">Sem Gaps, Sem Quebras</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Passe o mouse sobre os painéis para ver como cada imagem é independente,
              mas juntas formam uma composição perfeita.
            </p>
          </div>

          {/* === DEMONSTRAÇÃO PRINCIPAL === */}
          <div
            ref={containerRef}
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setHoveredPanel(null) }}
          >
            {/* Container das 3 imagens juntas */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-amber-500/10">
              {/* Grid das 3 imagens - sem gaps para formar unidade */}
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
                      src={img}
                      alt={`Painel ${index + 1}`}
                      className="w-full h-auto object-cover transition-all duration-500"
                      style={{
                        filter: isHovered && hoveredPanel !== null && hoveredPanel !== index
                          ? 'brightness(0.7) saturate(0.8)'
                          : 'brightness(1) saturate(1)',
                      }}
                    />
                    {/* Overlay com label */}
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                      style={{
                        opacity: isHovered && hoveredPanel === index ? 1 : 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                      }}
                    >
                      <span className="absolute bottom-4 left-4 bg-amber-500/90 text-black font-bold px-3 py-1 rounded-full text-sm">
                        Imagem {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Linha divisória animada que aparece no hover */}
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

            {/* Indicador de unidade */}
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

      {/* Explicação da Técnica */}
      <section className="py-16 md:py-24 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Como <span className="text-amber-400">Funciona</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Passo 1 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 h-full">
                <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-amber-400">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Imagens Planejadas</h3>
                <p className="text-gray-400 leading-relaxed">
                  Crie ou edite as imagens para que as bordas se conectem. Use ferramentas como Photoshop
                  para dividir uma imagem panorâmica em 3 partes iguais.
                </p>
                <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
                  <code className="text-amber-300 text-sm">
                    Largura total ÷ 3 = largura de cada fatia
                  </code>
                </div>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 h-full">
                <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-amber-400">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">CSS Grid sem Gaps</h3>
                <p className="text-gray-400 leading-relaxed">
                  Use CSS Grid ou Flexbox sem espaçamento entre os elementos. As imagens devem
                  ficar lado a lado sem margens, gaps ou padding entre elas.
                </p>
                <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
                  <code className="text-amber-300 text-sm">
                    gap: 0; margin: 0; padding: 0;
                  </code>
                </div>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 h-full">
                <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-amber-400">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Responsividade</h3>
                <p className="text-gray-400 leading-relaxed">
                  Em telas menores, empilhe as imagens verticalmente. Em telas maiores,
                  exiba lado a lado. A proporção das imagens mantém a coerência visual.
                </p>
                <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
                  <code className="text-amber-300 text-sm">
                    grid-cols-1 md:grid-cols-3
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Código de Exemplo */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            O <span className="text-amber-400">Código</span> Essencial
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Este é o código CSS/HTML que faz as 3 imagens se juntarem perfeitamente:
          </p>

          <div className="bg-gray-900 rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-gray-400 text-sm">composicao.css</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm md:text-base">
              <code className="text-gray-300">
{`/* Container principal - sem gaps! */`}
{'\n'}
<span className="text-purple-400">.unidade-visual</span> {`{`}
{'\n  '}
<span className="text-cyan-400">display</span>: <span className="text-amber-300">grid</span>;
{'\n  '}
<span className="text-cyan-400">grid-template-columns</span>: <span className="text-amber-300">repeat(3, 1fr)</span>;
{'\n  '}
<span className="text-cyan-400">gap</span>: <span className="text-amber-300">0</span>;  <span className="text-green-400">/* ← CHAVE: sem espaço */</span>
{'\n  '}
<span className="text-cyan-400">width</span>: <span className="text-amber-300">100%</span>;
{'\n  '}
<span className="text-cyan-400">overflow</span>: <span className="text-amber-300">hidden</span>;
{'\n'}
{`}`}
{'\n\n'}
{`/* Cada imagem individual */`}
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
{`/* Responsivo: empilha em mobile */`}
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
        </div>
      </section>

      {/* Demonstração Responsiva */}
      <section className="py-16 md:py-24 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Funciona em <span className="text-amber-400">Qualquer Tela</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Redimensione a janela do navegador para ver como a composição se adapta.
            Em desktop: lado a lado. Em mobile: empilhada mas ainda coerente.
          </p>

          {/* Simulação de dispositivos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Desktop */}
            <div className="text-center">
              <div className="bg-gray-800 rounded-xl p-3 border border-gray-700/50">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-3">
                    {images.map((img, i) => (
                      <img key={i} src={img} alt="" className="w-full h-auto" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-400">💻 Desktop — 3 colunas</p>
            </div>

            {/* Tablet */}
            <div className="text-center">
              <div className="bg-gray-800 rounded-xl p-3 border border-gray-700/50 max-w-[280px] mx-auto">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-3">
                    {images.map((img, i) => (
                      <img key={i} src={img} alt="" className="w-full h-auto" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-400">📱 Tablet — 3 colunas (menor)</p>
            </div>

            {/* Mobile */}
            <div className="text-center">
              <div className="bg-gray-800 rounded-xl p-3 border border-gray-700/50 max-w-[160px] mx-auto">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1">
                    {images.map((img, i) => (
                      <img key={i} src={img} alt="" className="w-full h-auto" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-400">📲 Mobile — empilhada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dicas extras */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            💡 Dicas <span className="text-amber-400">Importantes</span>
          </h2>

          <div className="space-y-6">
            {[
              {
                icon: '🎨',
                title: 'Planeje as imagens juntas',
                desc: 'Crie uma imagem panorâmica completa e depois divida em 3 partes iguais. Isso garante que as bordas se encaixem perfeitamente.',
              },
              {
                icon: '📐',
                title: 'Mesma altura, largura proporcional',
                desc: 'Todas as imagens devem ter a mesma altura. Use object-fit: cover para garantir que não haja distorção.',
              },
              {
                icon: '🔄',
                title: 'object-fit: cover é seu amigo',
                desc: 'Essa propriedade CSS garante que a imagem preencha o espaço sem distorcer, cortando apenas o excesso.',
              },
              {
                icon: '📱',
                title: 'Considere o empilhamento mobile',
                desc: 'Em telas pequenas, as imagens empilham. Planeje para que cada imagem funcione sozinha E em conjunto.',
              },
              {
                icon: '⚡',
                title: 'Use loading="lazy"',
                desc: 'Adicione loading="lazy" nas imagens para melhor performance. Cada imagem carrega independentemente.',
              },
              {
                icon: '🖼️',
                title: 'Formato das imagens',
                desc: 'Use WebP ou AVIF para melhor compressão. Mantenha proporção 4:3 ou 16:9 para consistência visual.',
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 bg-gray-800/50 rounded-xl border border-gray-700/30 hover:border-amber-500/30 transition-colors duration-300"
              >
                <span className="text-3xl flex-shrink-0">{tip.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{tip.title}</h3>
                  <p className="text-gray-400">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demonstração interativa com separação */}
      <section className="py-16 md:py-24 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Demonstração <span className="text-amber-400">Interativa</span>
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Clique nos botões para ver as imagens separadas e juntas
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveSection(0)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeSection === 0
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              🔗 Juntas (Unidade)
            </button>
            <button
              onClick={() => setActiveSection(1)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeSection === 1
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              🔍 Separadas (Individuais)
            </button>
          </div>

          <div className="transition-all duration-700 ease-out">
            {activeSection === 0 ? (
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {images.map((img, i) => (
                    <img key={i} src={img} alt={`Painel ${i + 1}`} className="w-full h-auto object-cover" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {images.map((img, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative overflow-hidden rounded-2xl border-2 border-gray-700 group-hover:border-amber-500/50 transition-colors">
                      <img src={img} alt={`Imagem ${i + 1}`} className="w-full h-auto object-cover" />
                      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <span className="text-amber-400 font-bold">Imagem {i + 1}</span>
                        <p className="text-gray-300 text-sm">Funciona sozinha</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Técnica de composição visual com CSS Grid • Responsivo para todos os dispositivos
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-600 text-xs">
            <span>HTML</span>
            <span>•</span>
            <span>CSS Grid</span>
            <span>•</span>
            <span>object-fit</span>
            <span>•</span>
            <span>Media Queries</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
