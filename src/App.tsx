import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search,
  Globe,
  Beaker, 
  FlaskConical, 
  ShieldCheck, 
  Download, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Microscope,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { Input } from '@/components/ui/input.tsx';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog.tsx';
import { Navbar, Footer, Section } from './components/Layout.tsx';
import MoleculeViewer from './components/MoleculeViewer.tsx';
import InquiryForm from './components/InquiryForm.tsx';
import ApplicationMatrix from './components/ApplicationMatrix.tsx';
import { INITIAL_PRODUCTS } from './constants';
import { Product, Grade } from './types';

function ProductCard({ product, onSelect }: { product: Product; onSelect: (p: Product) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
    >
      <Card id={`product-${product.id}`} className="bg-slate-900/40 border-slate-800 overflow-hidden group">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
          <div className="absolute top-4 left-4 flex gap-2">
            {product.grades.map(grade => (
              <Badge key={grade} variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 backdrop-blur-md">
                {grade}
              </Badge>
            ))}
          </div>
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {product.name}
            </CardTitle>
            <span className="text-xs font-mono text-slate-500 pt-1">CAS: {product.casNumber}</span>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-500">
            <div className="flex flex-col border-l border-slate-800 pl-2">
              <span>FORMULA</span>
              <span className="text-slate-300">{product.formula}</span>
            </div>
            <div className="flex flex-col border-l border-slate-800 pl-2">
              <span>PURITY</span>
              <span className="text-slate-300">{product.purity}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0 border-t border-slate-800/50 mt-4">
          <Button 
            variant="ghost" 
            className="w-full justify-between text-blue-400 hover:text-blue-300 hover:bg-blue-400/5 p-0"
            onClick={() => onSelect(product)}
          >
            Detailed Specifications <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function ProductModal({ product, isOpen, onOpenChange }: { product: Product | null; isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-slate-950 border-slate-800 text-slate-300">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline" className="text-blue-400 border-blue-400/30">Molecular Structure</Badge>
            <span className="text-xs font-mono text-slate-500">REF_{product.casNumber}</span>
          </div>
          <DialogTitle className="text-3xl font-bold text-white">{product.name}</DialogTitle>
          <DialogDescription className="text-slate-400">
            Advanced technical parameters and quality assurance data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="space-y-6">
            <div className="glass-morphism rounded-xl overflow-hidden border border-slate-800">
              <MoleculeViewer />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <p className="text-[10px] font-mono text-slate-500 mb-1 uppercase tracking-wider">Molecular Weight</p>
                <p className="text-white font-semibold">{product.molecularWeight} g/mol</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <p className="text-[10px] font-mono text-slate-500 mb-1 uppercase tracking-wider">Appearance</p>
                <p className="text-white font-semibold">{product.appearance}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="bg-slate-900 border-slate-800">
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="docs">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specs" className="mt-4 space-y-4">
                <div className="space-y-3">
                  {[
                    { label: 'CAS No.', value: product.casNumber },
                    { label: 'Molecular Formula', value: product.formula },
                    { label: 'Purity Level', value: product.purity },
                    { label: 'Standard Compliance', value: product.grades.join(', ') },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-900">
                      <span className="text-sm text-slate-500">{item.label}</span>
                      <span className="text-sm font-medium text-slate-200">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10 mt-6">
                  <div className="flex gap-2 items-start text-blue-400">
                    <Info className="w-4 h-4 mt-0.5" />
                    <p className="text-xs leading-relaxed">
                      Custom purification and particle size customization available upon request for industrial volumes.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="applications" className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {product.applications.map(app => (
                    <Badge key={app} variant="secondary" className="bg-slate-900 text-slate-300 border-slate-800">
                      {app}
                    </Badge>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-relaxed text-slate-400">
                  {product.description}
                </p>
              </TabsContent>

              <TabsContent value="docs" className="mt-4 space-y-3">
                <Button variant="outline" className="w-full justify-between bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800">
                  Certificate of Analysis (COA) <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800">
                  Safety Data Sheet (MSDS) <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800">
                  Product Technical Sheet <Download className="w-4 h-4" />
                </Button>
              </TabsContent>
            </Tabs>

            <div className="pt-6">
              <Dialog>
                <DialogTrigger 
                  render={
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-6 text-lg font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                      Inquiry for Quote
                    </Button>
                  }
                />
                <DialogContent className="bg-slate-950 border-slate-800">
                  <DialogHeader>
                    <DialogTitle>Send Technical Inquiry</DialogTitle>
                    <DialogDescription>
                      Request bulk pricing and technical documentation for {product.name}.
                    </DialogDescription>
                  </DialogHeader>
                  <InquiryForm productName={product.name} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AnalyticsSection() {
  return (
    <Section className="bg-slate-950 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <Badge variant="outline" className="mb-6 text-cyan-400 border-cyan-400/30 font-mono">LAB_LOG_V2.0</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Precision Analytical <br />
            <span className="text-slate-500 italic font-light">Infrastructure.</span>
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-1 px-1 bg-gradient-to-b from-blue-500 to-transparent self-stretch" />
              <div>
                <h4 className="text-xl font-bold text-white mb-2">HPLC Analysis</h4>
                <p className="text-slate-400 text-sm leading-relaxed">High-performance liquid chromatography ensures accurate purity assessment for every production batch.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-1 px-1 bg-gradient-to-b from-cyan-500 to-transparent self-stretch" />
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Particle Size Control</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Laser diffraction technology monitors crystal structure to ensure optimal solubility and compressibility.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-1 px-1 bg-gradient-to-b from-purple-500 to-transparent self-stretch" />
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Stability Testing</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Real-time and accelerated stability chambers confirm shelf-life integrity under diverse global climates.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="glass-morphism p-8 rounded-3xl border border-slate-800">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase">Batch Reliability Index</p>
                <div className="text-3xl font-bold text-white">99.982%</div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-green-500 uppercase">Active Monitoring</p>
                <div className="text-sm font-mono text-slate-400">STATUS_OPTIMAL</div>
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'Purity Variance', value: 98, color: 'bg-blue-500' },
                { label: 'Moisture Control', value: 92, color: 'bg-cyan-500' },
                { label: 'Heavy Metal Compliance', value: 100, color: 'bg-green-500' },
                { label: 'Solubility Rate', value: 85, color: 'bg-purple-500' },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono uppercase">
                    <span className="text-slate-500">{stat.label}</span>
                    <span className="text-slate-300">{stat.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className={`h-full ${stat.color} shadow-[0_0_10px_rgba(59,130,246,0.3)]`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-4 border border-blue-500/10 bg-blue-500/5 rounded-xl text-center">
              <p className="text-xs text-blue-400 font-mono">View Certification Documents (ISO / GMP / FDA)</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.casNumber.includes(searchQuery)
    );
  }, [searchQuery]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-blue-600/30 selection:text-blue-400">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Animation Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="outline" className="mb-6 px-4 py-1 text-blue-400 border-blue-400/30 uppercase tracking-[0.2em] text-[10px]">
                Precision Bio-Chemistry
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6">
                Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Amino Acid</span> Solutions
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed max-w-xl mb-10">
                Supplying the global pharmaceutical and nutritional industries with high-purity crystalline amino acids. Built for scientists, by engineers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg group">
                  Explore Products <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="border-slate-800 text-white hover:bg-slate-900 rounded-full px-8 py-6 text-lg">
                  Quality Assurance
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-slate-900 pt-8">
                <div>
                  <h4 className="text-2xl font-bold text-white">99.9%</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Purity Rating</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">50+</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Product Catalog</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">30+</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Countries Served</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 p-4 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl">
                <MoleculeViewer />
                <div className="absolute -bottom-6 -right-6 p-6 bg-blue-600 rounded-2xl shadow-2xl text-white">
                  <Microscope className="w-8 h-8 mb-2" />
                  <p className="text-sm font-bold">Interactive 3D View</p>
                  <p className="text-[10px] opacity-70">Analyze Molecular Bonds</p>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-cyan-500/30 blur-3xl opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Ticker */}
      <div className="border-y border-slate-900 bg-slate-950/50 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-40 grayscale">
          <div className="text-xl font-bold text-white flex items-center gap-2"><ShieldCheck className="w-6 h-6" /> PHARMA COMPLIANT</div>
          <div className="text-xl font-bold text-white">GMP CERTIFIED</div>
          <div className="text-xl font-bold text-white underline decoration-blue-500 underline-offset-8">ISO 9001:2015</div>
          <div className="text-xl font-bold text-white italic">ECO-FRIENDLY BIO</div>
        </div>
      </div>

      {/* Product Discovery */}
      <Section id="products">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <Badge variant="outline" className="mb-4 text-blue-400 border-blue-400/30">Catalog</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">Precision Product Line</h2>
            <p className="text-slate-400">Search by name, CAS number, or filter by grade level.</p>
          </div>
          <div className="w-full md:w-80 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Search L-Arginine, CAS..." 
              className="pl-10 bg-slate-900 border-slate-800 text-white focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onSelect={handleSelectProduct} 
            />
          ))}
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-800 rounded-xl"
          >
            <FlaskConical className="w-12 h-12 text-slate-700 mb-4" />
            <h3 className="text-white font-semibold mb-2">Can't find a specific compound?</h3>
            <p className="text-sm text-slate-500 text-center mb-6">We provide custom synthesis for rare amino acids and specialized derivatives.</p>
            <Button variant="outline" className="border-slate-800 text-slate-400 hover:text-white">Contact Special Orders</Button>
          </motion.div>
        </div>
      </Section>

      {/* Industrial Applications Matrix */}
      <Section className="bg-slate-950">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 text-blue-400 border-blue-400/30">Industry Verticals</Badge>
          <h2 className="text-4xl font-bold text-white mb-6">Built for Diverse Sectors</h2>
          <p className="text-slate-400">Our manufacturing lines are segmented to meet the specific certification and purity requirements of your industry.</p>
        </div>
        <ApplicationMatrix />
      </Section>

      {/* Precision Analytics */}
      <AnalyticsSection />

      {/* Features / Why Us */}
      <Section className="bg-slate-900/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-white">Quality Uncompromised</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every batch undergoes strictly multi-level quality inspection with GC-MS and HPLC to ensure pharmaceutical purity levels.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-cyan-500" />
            </div>
            <h3 className="text-xl font-bold text-white">Global Distribution</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Strategically located warehouses and integrated logistics partners ensure timely delivery across North America, Europe, and Asia.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Beaker className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-white">R&D Partnership</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Beyond supply, we collaborate with laboratories for custom formulations and pre-clinical research sample production.
            </p>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="relative overflow-hidden">
        <div className="relative z-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-center md:text-left md:flex items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to scale your biopharma production?</h2>
            <p className="text-blue-100 text-lg opacity-80 leading-relaxed">
              Get in touch with our technical sales team for bulk pricing, COA samples, and regulatory support today.
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-8 text-xl font-bold">
              Request a Quote
            </Button>
            <Button size="lg" variant="outline" className="border-blue-400 text-white hover:bg-blue-700 px-8 py-8 text-xl">
              Talk to Expert
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px]" />
      </Section>

      <Footer />

      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </div>
  );
}
