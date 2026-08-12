import re

with open('src/components/TradingJournal.tsx', 'r') as f:
    content = f.read()

old_chart_start = """            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">"""

new_chart_start = """            <div className="h-72 w-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={dateFilter}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <ResponsiveContainer width="100%" height="100%">"""

old_chart_end = """                </AreaChart>
              </ResponsiveContainer>
            </div>"""

new_chart_end = """                </AreaChart>
              </ResponsiveContainer>
                </motion.div>
              </AnimatePresence>
            </div>"""

content = content.replace(old_chart_start, new_chart_start)
content = content.replace(old_chart_end, new_chart_end)

with open('src/components/TradingJournal.tsx', 'w') as f:
    f.write(content)
