"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, BarChart3, Mail, Github, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/questions-logo.png"
                alt="Joots Logo"
                width={32}
                height={32}
                className="filter brightness-0 invert"
              />
              <span className="text-2xl font-bold">JOOTS</span>
            </div>
            <p className="text-gray-400">Where connections spark and insights emerge. Join the social revolution.</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400 hover:text-white cursor-pointer">
                <MessageCircle className="h-4 w-4" />
                <span>Icebreaker</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 hover:text-white cursor-pointer">
                <BarChart3 className="h-4 w-4" />
                <span>Socioscopy</span>
              </div>
              <a href="#" className="block text-gray-400 hover:text-white">
                Real-time Chat
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Analytics
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Community
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white">
                About Us
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Careers
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Press
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Blog
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Contact
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-400 text-sm">Get the latest updates and insights delivered to your inbox.</p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 Joots. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
