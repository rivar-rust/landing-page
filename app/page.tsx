"use client"

import { useEffect, useState } from "react"
import { Copy, Check } from "lucide-react"

export default function TerminalIDE() {
  const [currentCommand, setCurrentCommand] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [matrixChars, setMatrixChars] = useState<string[]>([])
  const [animatedBoxes, setAnimatedBoxes] = useState<boolean[]>([])
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentTyping, setCurrentTyping] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionStep, setExecutionStep] = useState(0)
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const commands = [
    "rivar init --template risk-model",
    "rivar calculate --VaR --confidence 0.95",
    "rivar backtest --strategy my-strategy",
    "rivar analyze --portfolio holdings.json",
  ]

  const terminalSequences = [
    {
      command: "rivar init --template risk-model",
      outputs: [
        "🚀 Initializing RiVaR project...",
        "📦 Loading risk models...",
        "⚙️ Configuring portfolio parameters...",
        "✅ Project initialized successfully!",
      ],
    },
    {
      command: "rivar calculate --VaR --confidence 0.95",
      outputs: [
        "📊 Loading historical data...",
        "🔢 Computing variance-covariance matrix...",
        "⚡ Calculating Value at Risk...",
        "✨ VaR: $2.45M (95% confidence)",
      ],
    },
    {
      command: "rivar backtest --strategy my-strategy",
      outputs: [
        "📈 Loading historical prices...",
        "🔍 Running backtest simulation...",
        "📉 Computing performance metrics...",
        "🎯 Sharpe Ratio: 1.82 | Max Drawdown: -12.3%",
      ],
    },
    {
      command: "rivar analyze --portfolio holdings.json",
      outputs: [
        "💼 Analyzing portfolio composition...",
        "📊 Computing factor exposures...",
        "⚠️ Identifying risk concentrations...",
        "✨ Risk report generated!",
      ],
    },
  ]

  const heroAsciiText = `██╗  ██╗███████╗██╗  ██╗ █████╗     ██████╗██╗     ██╗
██║  ██║██╔════╝╚██╗██╔╝██╔══██╗   ██╔════╝██║     ██║
███████║█████╗   ╚███╔╝ ███████║   ██║     ██║     ██║
██╔══██║██╔══╝   ██╔██╗ ██╔══██║   ██║     ██║     ██║
██║  ██║███████╗██╔╝ ██╗██║  ██║   ╚██████╗███████╗██║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═════╝╚══════╝╚═╝`

  useEffect(() => {
    const chars = "RIVAR01010101VaR█▓▒░▄▀■□▪▫".split("")
    const newMatrixChars = Array.from({ length: 100 }, () => chars[Math.floor(Math.random() * chars.length)])
    setMatrixChars(newMatrixChars)

    const interval = setInterval(() => {
      setMatrixChars((prev) => prev.map(() => chars[Math.floor(Math.random() * chars.length)]))
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const boxes = Array.from({ length: 6 }, () => Math.random() > 0.5)
    setAnimatedBoxes(boxes)

    const interval = setInterval(() => {
      setAnimatedBoxes((prev) => prev.map(() => Math.random() > 0.3))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const sequence = terminalSequences[currentCommand]
    const timeouts: NodeJS.Timeout[] = []

    const runSequence = async () => {
      setTerminalLines([])
      setCurrentTyping("")
      setIsExecuting(false)
      setExecutionStep(0)

      const command = sequence.command
      for (let i = 0; i <= command.length; i++) {
        timeouts.push(
          setTimeout(() => {
            setCurrentTyping(command.slice(0, i))
          }, i * 50),
        )
      }

      timeouts.push(
        setTimeout(
          () => {
            setIsExecuting(true)
            setCurrentTyping("")
            setTerminalLines((prev) => [...prev, `user@dev:~/project$ ${command}`])
          },
          command.length * 50 + 500,
        ),
      )

      sequence.outputs.forEach((output, index) => {
        timeouts.push(
          setTimeout(
            () => {
              setExecutionStep(index + 1)
              setTerminalLines((prev) => [...prev, output])
            },
            command.length * 50 + 1000 + index * 800,
          ),
        )
      })

      timeouts.push(
        setTimeout(
          () => {
            setCurrentCommand((prev) => (prev + 1) % commands.length)
          },
          command.length * 50 + 1000 + sequence.outputs.length * 800 + 2000,
        ),
      )
    }

    runSequence()

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [currentCommand])

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-hidden relative">
      {/* ... existing nav code ... */}
      <nav className="border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm p-4 relative z-10 sticky top-0">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-lg">RiVaR</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8 ml-8">
              <a
                href="#features"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer relative group"
              >
                <span>Features</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a
                href="#models"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer relative group"
              >
                <span>Risk Models</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a
                href="#integrations"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer relative group"
              >
                <span>Integrations</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a
                href="https://docs.rivar.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer relative group"
              >
                <span>Docs</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-gray-500 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>v0.1.0</span>
            </div>

            <div
              className="group relative cursor-pointer"
              onClick={() => copyToClipboard("cargo install rivar", "nav-install")}
            >
              <div className="absolute inset-0 border border-gray-600 bg-gray-900/20 transition-all duration-300 group-hover:border-white group-hover:shadow-lg group-hover:shadow-white/20"></div>
              <div className="relative border border-gray-400 bg-transparent text-white font-medium px-6 py-2 text-sm transition-all duration-300 group-hover:border-white group-hover:bg-gray-900/30 transform translate-x-0.5 translate-y-0.5 group-hover:translate-x-0 group-hover:translate-y-0">
                <div className="flex items-center gap-2">
                  {copiedStates["nav-install"] ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                  <span className="text-gray-400">$</span>
                  <span>Install</span>
                </div>
              </div>
            </div>

            <button className="md:hidden text-gray-400 hover:text-white transition-colors">
              <div className="w-6 h-6 flex flex-col justify-center gap-1">
                <div className="w-full h-0.5 bg-current transition-all duration-300"></div>
                <div className="w-full h-0.5 bg-current transition-all duration-300"></div>
                <div className="w-full h-0.5 bg-current transition-all duration-300"></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ... existing matrix background ... */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-25 gap-1 h-full">
          {matrixChars.map((char, i) => (
            <div key={i} className="text-gray-500 text-xs animate-pulse">
              {char}
            </div>
          ))}
        </div>
      </div>

      {/* ... existing hero section ... */}
      <section className="relative px-6 py-20 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-8">
              <pre className="text-white text-lg lg:text-xl font-bold leading-none inline-block">{heroAsciiText}</pre>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Built to help you <span className="text-gray-400 animate-pulse">quantify</span>,
              <br />
              and manage <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">financial risk</span>.
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
              A powerful Rust-based library for quantitative risk management. Calculate VaR, run Monte Carlo simulations, 
              and analyze portfolio risk directly from your terminal.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div
                className="group relative cursor-pointer w-full sm:w-auto"
                onClick={() => copyToClipboard("cargo install rivar", "hero-install")}
              >
                <div className="absolute inset-0 border border-gray-600 bg-gray-900/20 transition-all duration-300 group-hover:border-white group-hover:shadow-lg group-hover:shadow-white/20"></div>
                <div className="relative border border-white bg-white text-black font-bold px-6 sm:px-10 py-4 text-base sm:text-lg transition-all duration-300 group-hover:bg-gray-100 group-hover:text-black transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 text-center">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {copiedStates["hero-install"] ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    )}
                    <span className="text-gray-600 text-sm sm:text-base">$</span>
                    <span className="text-sm sm:text-base">cargo install rivar</span>
                  </div>
                </div>
              </div>

              <a href="https://docs.rivar.dev" target="_blank" rel="noopener noreferrer" className="group relative cursor-pointer w-full sm:w-auto">
                <div className="absolute inset-0 border-2 border-dashed border-gray-600 bg-gray-900/20 transition-all duration-300 group-hover:border-white group-hover:shadow-lg group-hover:shadow-white/20"></div>
                <div className="relative border-2 border-dashed border-gray-400 bg-transparent text-white font-bold px-10 py-4 text-lg transition-all duration-300 group-hover:border-white group-hover:bg-gray-900/30 transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">→</span>
                    <span>View Documentation</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* ... existing terminal section ... */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-950 border border-gray-700 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                  </div>
                  <span className="text-gray-400 text-sm">rivar-terminal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-500 text-xs">LIVE</span>
                </div>
              </div>

              <div className="p-6 min-h-[300px] bg-black">
                <div className="space-y-2 text-sm">
                  {terminalLines.map((line, index) => (
                    <div
                      key={index}
                      className={`${line.startsWith("user@dev") ? "text-white" : "text-gray-300"} ${line.includes("✅") || line.includes("✨") || line.includes("🎉") ? "text-green-400" : ""}`}
                    >
                      {line}
                    </div>
                  ))}

                  {!isExecuting && (
                    <div className="text-white">
                      <span className="text-green-400">risk@quant</span>
                      <span className="text-gray-500">:</span>
                      <span className="text-blue-400">~/portfolio</span>
                      <span className="text-white">$ </span>
                      <span className="text-white">{currentTyping}</span>
                      <span className={`text-white ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>
                        █
                      </span>
                    </div>
                  )}

                  {isExecuting && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-xs">Processing...</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">Commands executed:</span>
                    <span className="text-white">{currentCommand + 1}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">Risk Models:</span>
                    <span className="text-gray-500">Active</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">Status:</span>
                    <span className="text-gray-500">{isExecuting ? "Running" : "Ready"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ... existing integrations section ... */}
      <section className="px-6 py-16 lg:px-12 border-t border-gray-800" id="integrations">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Data Provider Integration</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Connect to leading market data providers. One tool, infinite data sources.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-950 border border-gray-800 shadow-xl">
              <div className="flex items-center justify-between px-6 py-3 bg-gray-900 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500"></div>
                    <div className="w-3 h-3 bg-yellow-500"></div>
                    <div className="w-3 h-3 bg-green-500"></div>
                  </div>
                  <span className="text-gray-400 text-sm">rivar data --sources</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-500 text-xs">ALL CONNECTED</span>
                </div>
              </div>

              <div className="p-6 bg-black">
                <div className="text-sm text-gray-400 mb-4">$ rivar data --scan</div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono text-sm mb-6">
                  {[
                    { name: "Bloomberg", status: "✓", desc: "Enterprise market data" },
                    { name: "Reuters", status: "✓", desc: "Financial news & data" },
                    { name: "Alpaca", status: "✓", desc: "Commission-free trading" },
                    { name: "Yahoo Finance", status: "✓", desc: "Free market data" },
                    { name: "Polygon.io", status: "✓", desc: "Real-time market data" },
                    { name: "Interactive Brokers", status: "✓", desc: "Broker integration" },
                  ].map((source) => (
                    <div
                      key={source.name}
                      className="flex items-center justify-between py-2 px-3 hover:bg-gray-900 cursor-pointer group transition-all duration-200 border border-transparent hover:border-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-green-400 group-hover:text-white transition-colors w-4">
                          {source.status}
                        </span>
                        <span className="text-white group-hover:text-gray-200 transition-colors">{source.name}</span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 text-xs">
                        {source.desc}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="text-sm text-gray-400">
                      <div className="font-mono text-xs text-gray-500 space-y-1">
                        <div>$ rivar data --connect alpaca # Connect Alpaca</div>
                        <div>$ rivar data --sync # Sync all data</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>6 Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Real-time</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
                <span className="text-green-400">●</span>
                <span>Universal compatibility • Instant setup • Works everywhere</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ... existing models section ... */}
      <section className="px-6 py-20 lg:px-12 border-t border-gray-800" id="models">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Risk Models</h2>
            <p className="text-xl text-gray-400">Industry-standard risk metrics at your fingertips</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-950 border border-gray-800 shadow-2xl">
              <div className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500"></div>
                    <div className="w-3 h-3 bg-yellow-500"></div>
                    <div className="w-3 h-3 bg-green-500"></div>
                  </div>
                  <span className="text-gray-400 text-sm">rivar model --list</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-500 text-xs">6 AVAILABLE</span>
                </div>
              </div>

              <div className="p-6 bg-black">
                <div className="text-sm text-gray-400 mb-4">$ rivar model --list</div>

                <div className="space-y-2 font-mono text-sm">
                  {[
                    { id: "1", name: "VaR", provider: "Parametric", status: "●", color: "text-green-400", desc: "Value at Risk" },
                    { id: "2", name: "CVaR", provider: "Conditional", status: "●", color: "text-green-400", desc: "Conditional VaR (ES)" },
                    { id: "3", name: "Monte Carlo", provider: "Simulation", status: "●", color: "text-green-400", desc: "MC simulation" },
                    { id: "4", name: "Historical", provider: "Backtest", status: "●", color: "text-green-400", desc: "Historical simulation" },
                    { id: "5", name: "GARCH", provider: "Volatility", status: "●", color: "text-green-400", desc: "Volatility modeling" },
                    { id: "6", name: "Factor", provider: "Regression", status: "●", color: "text-green-400", desc: "Factor risk model" },
                  ].map((model) => (
                    <div
                      key={model.id}
                      className="flex items-center justify-between py-2 px-4 hover:bg-gray-900 cursor-pointer group transition-all duration-200 border border-transparent hover:border-gray-700"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500 w-6">[{model.id}]</span>
                        <span className={`${model.color} group-hover:text-white transition-colors`}>
                          {model.status}
                        </span>
                        <span className="text-white group-hover:text-gray-200 transition-colors">{model.name}</span>
                        <span className="text-gray-500 text-xs">({model.provider})</span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 text-xs">
                        {model.desc}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="text-sm text-gray-400">
                      <div className="mb-2">Usage:</div>
                      <div className="font-mono text-xs text-gray-500 space-y-1">
                        <div>$ rivar calculate --VaR --confidence 0.95</div>
                        <div>$ rivar calculate --CVaR --horizon 10d</div>
                        <div>$ rivar backtest --strategy my-strategy</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>6 Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>0 Pending</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                        <span>Real-time</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
                <span className="text-green-400">●</span>
                <span>Industry-standard models • Zero configuration required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-12 border-t border-gray-800 bg-gray-950/30">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to quantify risk?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Build powerful risk models and simulations. Calculate VaR, run Monte Carlo simulations, 
              or analyze portfolio exposures in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-black border border-gray-700 p-6 h-full flex flex-col justify-between hover:border-white transition-all duration-300 group-hover:shadow-xl group-hover:shadow-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_50%)] bg-[length:4px_4px]">
                <div className="text-center flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 mx-auto mb-4 bg-gray-900 border border-gray-600 flex items-center justify-center group-hover:border-white transition-colors group-hover:bg-gray-800">
                      <span className="text-lg font-mono text-white group-hover:text-gray-100">01</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white group-hover:text-gray-100">Calculate VaR</h3>
                    <p className="text-gray-400 mb-4 group-hover:text-gray-300 text-sm leading-relaxed">
                      Compute Value at Risk using parametric, historical, or Monte Carlo methods
                    </p>
                  </div>
                  <div
                    className="bg-gray-900 border border-gray-700 p-2.5 font-mono text-xs text-left group-hover:border-gray-500 transition-colors group-hover:bg-gray-800 cursor-pointer flex items-center justify-between"
                    onClick={() => copyToClipboard("rivar calculate --VaR --confidence 0.95", "init-cmd")}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">$ </span>
                      <span className="text-white group-hover:text-gray-100">rivar calculate --VaR</span>
                    </div>
                    {copiedStates["init-cmd"] ? (
                      <Check className="w-3 h-3 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-gray-400 hover:text-white transition-colors" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-black border border-gray-700 p-6 h-full flex flex-col justify-between hover:border-white transition-all duration-300 group-hover:shadow-xl group-hover:shadow-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_50%)] bg-[length:4px_4px]">
                <div className="text-center flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 mx-auto mb-4 bg-gray-900 border border-gray-600 flex items-center justify-center group-hover:border-white transition-colors group-hover:bg-gray-800">
                      <span className="text-lg font-mono text-white group-hover:text-gray-100">02</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white group-hover:text-gray-100">Backtest</h3>
                    <p className="text-gray-400 mb-4 group-hover:text-gray-300 text-sm leading-relaxed">
                      Test trading strategies against historical data with detailed metrics
                    </p>
                  </div>
                  <div
                    className="bg-gray-900 border border-gray-700 p-2.5 font-mono text-xs text-left group-hover:border-gray-500 transition-colors group-hover:bg-gray-800 cursor-pointer flex items-center justify-between"
                    onClick={() => copyToClipboard("rivar backtest --strategy my-strategy", "generate-cmd")}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">$ </span>
                      <span className="text-white group-hover:text-gray-100">rivar backtest</span>
                    </div>
                    {copiedStates["generate-cmd"] ? (
                      <Check className="w-3 h-3 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-gray-400 hover:text-white transition-colors" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative h-full md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-black border border-gray-700 p-6 h-full flex flex-col justify-between hover:border-white transition-all duration-300 group-hover:shadow-xl group-hover:shadow-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_50%)] bg-[length:4px_4px]">
                <div className="text-center flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 mx-auto mb-4 bg-gray-900 border border-gray-600 flex items-center justify-center group-hover:border-white transition-colors group-hover:bg-gray-800">
                      <span className="text-lg font-mono text-white group-hover:text-gray-100">03</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white group-hover:text-gray-100">Analyze</h3>
                    <p className="text-gray-400 mb-4 group-hover:text-gray-300 text-sm leading-relaxed">
                      Comprehensive portfolio analysis with factor exposures and stress tests
                    </p>
                  </div>
                  <div
                    className="bg-gray-900 border border-gray-700 p-2.5 font-mono text-xs text-left group-hover:border-gray-500 transition-colors group-hover:bg-gray-800 cursor-pointer flex items-center justify-between"
                    onClick={() => copyToClipboard("rivar analyze --portfolio holdings.json", "deploy-cmd")}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">$ </span>
                      <span className="text-white group-hover:text-gray-100">rivar analyze</span>
                    </div>
                    {copiedStates["deploy-cmd"] ? (
                      <Check className="w-3 h-3 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-gray-400 hover:text-white transition-colors" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <a href="https://docs.rivar.dev" target="_blank" rel="noopener noreferrer" className="group relative cursor-pointer inline-block w-full sm:w-auto">
              <div className="absolute inset-0 border-2 border-gray-600 bg-gray-900/20 transition-all duration-300 group-hover:border-white group-hover:shadow-lg group-hover:shadow-white/20"></div>
              <div className="relative border-2 border-white bg-white text-black font-bold px-8 sm:px-16 py-4 sm:py-5 text-lg sm:text-xl transition-all duration-300 group-hover:bg-gray-100 group-hover:text-black transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 text-center">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <span className="text-gray-600 text-base sm:text-lg">▶</span>
                  <span className="text-base sm:text-lg">Get Started Now</span>
                </div>
              </div>
            </a>

            <div
              className="text-gray-400 text-base sm:text-lg font-mono hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 hover:bg-gray-900/30 rounded-none border border-transparent hover:border-gray-700"
              onClick={() => copyToClipboard("cargo install rivar", "bottom-install")}
            >
              {copiedStates["bottom-install"] ? (
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
              ) : (
                <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white transition-colors flex-shrink-0" />
              )}
              <span className="break-all sm:break-normal">$ cargo install rivar</span>
            </div>
          </div>
        </div>
      </section>

      {/* ... existing footer ... */}
      <footer className="border-t border-gray-800 px-6 py-12 lg:px-12 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-gray-600 text-lg mb-4">Built for quants, by quants.</div>
            <div className="text-gray-700 text-sm">© 2025 RiVaR. Quantify risk. Manage better.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
