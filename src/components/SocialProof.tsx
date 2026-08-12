export function SocialProof() {
  return (
    <section className="py-24 bg-brand-dark border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Community Feedback</h2>
        
        <div className="max-w-xl mx-auto bg-brand-card p-12 rounded-3xl border border-slate-800 border-dashed">
          <div className="w-16 h-16 bg-slate-800/30 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-xl text-slate-400 font-medium">Real member feedback soon.</p>
          <p className="text-sm text-slate-500 mt-2">Only genuine feedback with permission will be published.</p>
        </div>
      </div>
    </section>
  );
}
