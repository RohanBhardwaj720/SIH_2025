"use client";
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { ImageTooltip } from './ui/Tooltip';

export function Footer() {

  

  return (
    <footer className="w-full py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <span className="text-sm">© {new Date().getFullYear()} AgroHelp</span>
            
          </div>
        </div>
      </div>
    </footer>
  );
}