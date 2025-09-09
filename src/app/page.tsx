"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Footer } from '@/components/Footer';

const Page = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Footer />
    </div>
  )
}

export default Page