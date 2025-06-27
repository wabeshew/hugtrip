'use client'

import { FiHome, FiSearch, FiUser } from 'react-icons/fi';
import { HiCheck } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/bs';
import { Icon } from '@/components/ui/Icon';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="font-sans text-3xl font-bold mb-4">Font and Icon Showcase</h1>

      <section className="mb-8">
        <h2 className="font-sans text-2xl font-semibold mb-3">Font Demonstration</h2>
        <p className="font-sans text-lg mb-2">This is a sample text in Inter font (font-sans).</p>
        <p className="font-jp text-lg mb-2">これはNoto Sans JPフォントのサンプルテキストです (font-jp)。</p>
      </section>

      <section>
        <h2 className="font-sans text-2xl font-semibold mb-3">Icon Demonstration</h2>

        <div className="mb-6">
          <h3 className="font-sans text-xl font-semibold mb-2">Directly Imported Icons:</h3>
          <div className="flex items-center space-x-4 p-4 border rounded-md">
            <FiHome size={24} className="text-blue-500" title="FiHome Icon" />
            <FiSearch size={20} className="text-red-500" title="FiSearch Icon" />
            <HiCheck className="w-6 h-6 text-green-500" title="HiCheck Icon" />
            <BsArrowRight size={16} className="text-purple-500" title="BsArrowRight Icon" />
          </div>
        </div>

        <div>
          <h3 className="font-sans text-xl font-semibold mb-2">Unified Icon Component:</h3>
          <div className="flex items-center space-x-4 p-4 border rounded-md">
            <Icon icon={FiHome} size="lg" className="text-blue-700" title="Unified FiHome" />
            <Icon icon={FiSearch} size="md" className="text-red-700" title="Unified FiSearch" />
            <Icon icon={FiUser} size="sm" className="text-yellow-500" title="Unified FiUser" />
          </div>
        </div>
      </section>
    </main>
  );
}
