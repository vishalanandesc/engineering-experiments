'use client'

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, FileText, File, Image, Video, Music, Archive, Code, Check} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileItem {
  id: string;
  name: string;
  path: string;
  extension?: string;
}

interface FileDropdownProps {
  width?: string;
  className?: string;
}

const getFileIcon = (extension?: string) => {
    if (!extension) return File;
    
    const ext = extension.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) return Image;
    if (['mp4', 'avi', 'mov', 'wmv', 'flv'].includes(ext)) return Video;
    if (['mp3', 'wav', 'flac', 'aac'].includes(ext)) return Music;
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return Archive;
    if (['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'html', 'css'].includes(ext)) return Code;
    if (['md', 'txt', 'doc', 'docx', 'pdf'].includes(ext)) return FileText;
    
    return File;
  };

// Mock data
const files: FileItem[] = [
  {
    id: 'f1',
    name: 'TestAccountSetup.md',
    path: 'sfdx-project/docs/TestAccountSetup.md',
    extension: 'md'
  },
  {
    id: 'f2',
    name: 'logo.png',
    path: 'assets/images/logo.png',
    extension: 'png' 
  },
  {
    id: 'f3',
    name: 'config.json',
    path: 'sfdx-project/config/config.js',
    extension: 'js'
  },
  {
    id: 'f4',
    name: 'demo.mp4',
    path: 'assets/demo.mp4',
    extension: 'mp4'
  },
  {
    id: 'f5',
    name: 'styles.css',
    path: 'sfdx-project/styles.css',
    extension: 'css'
  },
  {
    id: 'f6',
    name: 'UserGuide.zip',
    path: 'UserGuide.zip',
    extension: 'zip'
  },
  {
    id: 'f7',
    name: 'README.md',
    path: 'sfdx-project/README.md',
    extension: 'md'
  }
];

export default function FileDropdown({ 
  width = '100%',
  className = ''
}: FileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem>(files[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const SelectedIcon = getFileIcon(selectedFile.extension);

  return (
    <div 
      className={`relative ${className}`}
      style={{ width }}
      ref={dropdownRef}
    >
      {/* Dropdown Trigger */}
      <button 
        onClick={toggleDropdown}
        className="flex w-full items-center gap-2 p-3 bg-white border border-[#E4E4E4] rounded-xl cursor-pointer hover:bg-[#FAFAFA] transition-colors"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <SelectedIcon size={16} color="var(--secondary)" className="flex-shrink-0" />

          <motion.div className="min-w-0">
            <AnimatePresence mode="popLayout">
              <motion.p
                key={selectedFile.path}
                initial={{opacity: 0 }}
                animate={{opacity: 1 }}
                exit={{opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}

                className="text-sm text-primary font-medium tracking-normal truncate"
              >
                {selectedFile.path}
              </motion.p>
            </AnimatePresence>
          </motion.div>
          
        </div>
        <ChevronDown 
          size={20} 
          color="var(--secondary)" 
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              y: -10, 
              scale: 0.95 
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1 
            }}
            exit={{ 
              opacity: 0, 
              y: -10, 
              scale: 0.95 
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.8
            }}
            className="absolute z-50 w-full mt-2 bg-white border border-[#E4E4E4] rounded-xl shadow-lg max-h-60 overflow-hidden"
          >
            <div className="overflow-y-auto max-h-60">
              {files.map((file, index) => {
                const IconComponent = getFileIcon(file.extension);
                const isSelected = selectedFile.id === file.id;
        
                return (
                  <motion.div
                    key={file.id}
                    initial={{ 
                      opacity: 0, 
                      x: -20 
                    }}
                    animate={{ 
                      opacity: 1, 
                      x: 0 
                    }}
                    transition={{
                      delay: index * 0.05, // Staggered animation
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                    onClick={() => handleFileSelect(file)}
                    className={`
                      flex items-center gap-2 p-3 cursor-pointer transition-colors duration-300 ease-out
                      hover:bg-[#FAFAFA]
                      ${isSelected ? 'bg-[#F5F5F5]' : ''}
                      ${file.id === files[files.length - 1].id ? '' : 'border-[0.5px] border-[#EEEEEE]'}
                    `}
                    
                    whileTap={{ scale: 1}}
                    
                  >
                    <IconComponent 
                      size={16} 
                      color="var(--secondary)" 
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm tracking-normal truncate text-primary]">
                        {file.path}
                      </p>
                    </div>
        
                    {isSelected && (
                      <motion.div>
                        <Check size={16} color="var(--primary)"/>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}