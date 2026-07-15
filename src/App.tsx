import { useState } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { useLenis } from "@/hooks/useLenis";
import { LoadingScreen } from "@/components/LoadingScreen";
import NotFound from "@/views/not-found";
import Home from "@/views/Home";
import Shop from "@/views/Shop";
import ProductDetail from "@/views/ProductDetail";
import Cart from "@/views/Cart";
import Checkout from "@/views/Checkout";
import PaymentSuccess from "@/views/PaymentSuccess";
import Kundali from "@/views/Kundali";
import About from "@/views/About";
import Contact from "@/views/Contact";
import FAQ from "@/views/FAQ";
import Orders from "@/views/Orders";
import Shipping from "@/views/Shipping";
import Wishlist from "@/views/Wishlist";

const queryClient = new QueryClient();

const pageTransition: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
};

function AnimatedRoutes() {
  const [location] = useLocation();
  useLenis();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location} variants={pageTransition} initial="initial" animate="animate" exit="exit">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/collections" component={Shop} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/payment-success" component={PaymentSuccess} />
          <Route path="/kundali" component={Kundali} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/faq" component={FAQ} />
          <Route path="/orders" component={Orders} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/returns" component={Shipping} />
          <Route path="/wishlist" component={Wishlist} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
          
          <AnimatePresence>
            {!isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full min-h-screen"
              >
                <WouterRouter base="">
                  <AnimatedRoutes />
                </WouterRouter>
                <Toaster />
              </motion.div>
            )}
          </AnimatePresence>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
