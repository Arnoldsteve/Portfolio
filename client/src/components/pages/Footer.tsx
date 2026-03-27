import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <h3 className="text-white font-bold text-lg mb-1">Steve Arnold Otieno</h3>
          <p className="text-sm text-slate-500">Full-Stack Software Engineer & Solutions Architect</p>
        </div>

        <div className="flex gap-6">
            <a href="https://linkedin.com/in/steve-arnold-otieno" target="_blank" className="hover:text-cyan-400 transition-colors">
                <Linkedin size={20} />
            </a>
            <a href="https://github.com/Arnoldsteve" target="_blank" className="hover:text-cyan-400 transition-colors">
                <Github size={20} />
            </a>
            <a href="mailto:stevearnold9e@gmail.com" className="hover:text-cyan-400 transition-colors">
                <Mail size={20} />
            </a>
        </div>

        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};