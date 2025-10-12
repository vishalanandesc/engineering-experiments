'use client'

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, File, Check } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  path: string;
}

interface FileDropdownProps {
  width?: string;
  className?: string;
}

// Mock data
const files: FileItem[] = [
  {
    id: 'f1',
    name: 'TestAccountSetup.md',
    path: 'sfdx-project/docs/TestAccountSetup.md',
  },
  {
    id: 'f2',
    name: 'UserGuide.pdf',
    path: 'UserGuide.pdf',
  },
  {
    id: 'f3',
    name: 'config.json',
    path: 'sfdx-project/config/config.json',
  },
  {
    id: 'f4',
    name: 'main.js',
    path: 'sfdx-project/src/main.js',
  },
  {
    id: 'f5',
    name: 'styles.css',
    path: 'sfdx-project/assets/styles.css',
  },
  {
    id: 'f6',
    name: 'logo.png',
    path: 'sfdx-project/assets/images/logo.png',
  },
  {
    id: 'f7',
    name: 'README.md',
    path: 'sfdx-project/README.md',
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

  return (
    <div 
      className={`relative ${className}`}
      style={{ width }}
      ref={dropdownRef}
    >
      {/* Dropdown Trigger */}
      <button 
        onClick={toggleDropdown}
        className="flex w-full items-center justify-between gap-3 p-3 bg-white border border-[#E4E4E4] rounded-xl cursor-pointer hover:bg-[#FAFAFA] transition-colors"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <File size={16} color="#7A7A82" className="flex-shrink-0" />
          <p className="text-sm text-primary font-medium truncate">
            {selectedFile.path}
          </p>
        </div>
        <ChevronDown 
          size={20} 
          color="#7A7A82" 
          className={`flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-[#E4E4E4] rounded-xl shadow-lg max-h-60 overflow-hidden">
          <div className="overflow-y-auto max-h-60">
            {files.map((file, index) => {
              const isSelected = selectedFile.id === file.id;
      
              return (
                <div
                  key={file.id}
                  onClick={() => handleFileSelect(file)}
                  className={`
                    flex items-center gap-2 p-3 cursor-pointer transition-colors
                    hover:bg-[#FAFAFA]
                    ${isSelected ? 'bg-[#F5F5F5]' : ''}
                    ${index !== files.length - 1 ? 'border-b border-[#EEEEEE]' : ''}
                  `}
                >
                  <File 
                    size={16} 
                    color="#7A7A82"
                    className="flex-shrink-0"
                  />

                  <p className="flex-1 text-sm truncate text-primary">
                    {file.path}
                  </p>
      
                  {isSelected && (
                    <Check size={16} color="#323238" className="flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}