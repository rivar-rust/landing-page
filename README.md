██████╗ ██╗██╗   ██╗ █████╗ ██████╗
██╔══██╗██║██║   ██║██╔══██╗██╔══██╗
██████╔╝██║██║   ██║███████║██████╔╝
██╔══██╗██║╚██╗ ██╔╝██╔══██║██╔══██╗
██║  ██║██║ ╚████╔╝ ██║  ██║██║  ██║
╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝

# Built to help you quantify, and manage financial risk.

A powerful Rust-based library for quantitative risk management. Calculate VaR, run Monte Carlo simulations, and analyze portfolio risk directly from your terminal.

--

## Install

```bash
cargo install rivar
```

## Quick Start

Run these common commands:

```bash
rivar init --template risk-model
rivar calculate --VaR --confidence 0.95
rivar backtest --strategy my-strategy
rivar analyze --portfolio holdings.json
```

## Features

- Calculate VaR (parametric, historical, Monte Carlo)
- Backtest strategies with historical data and performance metrics
- Portfolio analysis: factor exposures, risk concentrations, reports
- Integrations with major data providers (Bloomberg, Reuters, Alpaca, Polygon.io)

## Documentation

Get started with the docs: https://docs.rivar.dev

---

Open Source • v0.1.0
