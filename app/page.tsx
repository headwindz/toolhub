import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { tools } from '@/constants/tools'
import { categories } from '@/constants/categories'
import Link from 'next/link'
import {
  Sparkles,
  Zap,
  Shield,
  Layout,
  ArrowRight,
  Code,
  Globe,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const featuredTools = tools.filter((tool) => tool.badge).slice(0, 12)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 md:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10" />
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-400/[0.05] -z-10" />

        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Your complete toolkit for
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">
                  development needs
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Toolhub helps you organize everything you need in your daily
                work in one place. Without annoying ads and fully customizable.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/category/all">
                <Button size="lg" className="text-lg h-12 px-8">
                  Explore Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Popular Categories
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.slice(1, 7).map((category) => {
                  const Icon = category.icon
                  return (
                    <Link key={category.id} href={`/category/${category.id}`}>
                      <Badge
                        variant="outline"
                        className="px-4 py-2 text-sm hover:bg-primary/10 transition-colors cursor-pointer"
                      >
                        <Icon className="w-3.5 h-3.5 mr-1.5" />
                        {category.name}
                      </Badge>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-8 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Featured Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A set of built-in tools that help you do the tedious parts of your
              work quickly
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
            {featuredTools.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.name}
                  href={`/tools${tool.href}`}
                  className="h-full"
                >
                  <Card className="h-full transition-all group relative overflow-hidden hover:border-primary/50 hover:shadow-xl hover:scale-105">
                    <div className="flex flex-col h-full p-6">
                      <div className="flex mb-4 items-start justify-between">
                        <div
                          className={cn(
                            'flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110',
                            tool.color
                          )}
                        >
                          <Icon className="h-6 text-white w-6" />
                        </div>
                        {tool.badge && (
                          <Badge
                            variant={
                              tool.badge === 'New' ? 'default' : 'secondary'
                            }
                            className="text-xs"
                          >
                            {tool.badge}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-card-foreground mb-2 transition-colors group-hover:text-primary">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 inset-0 transition-opacity -z-10 absolute group-hover:opacity-100" />
                  </Card>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/category/all">
              <Button size="lg" variant="outline" className="cursor-pointer">
                View All {tools.length} Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="my-10">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Why Choose Toolhub?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for efficient development workflow
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <Card className="p-8 hover:shadow-lg transition-shadow border-2">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your data never leaves your device. Everything is processed
                locally.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow border-2">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                <Layout className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Beautiful UI</h3>
              <p className="text-muted-foreground leading-relaxed">
                Clean, modern interface with dark mode support. Designed for
                productivity and ease of use.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow border-2">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                <Code className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Developer Focused</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built by developers for developers. Every tool is crafted with
                real-world use cases in mind.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
