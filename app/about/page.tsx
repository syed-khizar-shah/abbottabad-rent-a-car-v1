"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Shield,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection, ScaleIn } from "@/components/animated-section";
import { useRef } from "react";
import { aboutApi } from "@/lib/api";
import { getIcon } from "@/lib/iconLoader";

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadData();
    setMounted(true);
  }, []);

  const loadData = async () => {
    try {
      const data = await aboutApi.get();
      setContent(data);
    } catch (err) {
      console.error("Error loading about content:", err);
    } finally {
      setLoading(false);
    }
  };

  // Only use scroll when component is mounted and ref exists
  // Must call all hooks before any conditional returns
  const scrollOptions =
    mounted && heroRef.current
      ? {
          target: heroRef,
          offset: ["start start", "end start"],
          layoutEffect: false,
        }
      : { layoutEffect: false };

  const { scrollYProgress } = useScroll(scrollOptions);

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={
              content.heroImage ||
              "/professional-luxury-car-rental-service-team.jpg"
            }
            alt="About Abbottabad Rent A Car"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/40 to-accent/20 z-[1]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge
                variant="outline"
                className="text-sm bg-background/20 backdrop-blur-sm"
              >
                {content.heroBadge}
              </Badge>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-6xl font-serif font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {content.heroTitle}
            </motion.h1>
            <motion.p
              className="text-xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {content.heroSubtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 border-y border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {content.stats &&
              content.stats.map((stat: any, index: number) => (
                <AnimatedSection key={index} delay={index * 0.1} direction="up">
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-serif font-bold">
                  {content.storyTitle}
                </h2>
                <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                  {content.storyParagraphs &&
                    content.storyParagraphs.map(
                      (paragraph: string, index: number) => (
                        <p key={index}>{paragraph}</p>
                      )
                    )}
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="group" asChild>
                    <Link href="/fleet">
                      {content.storyButtonText}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full"
                >
                  <Image
                    src={
                      content.storyImage ||
                      "/luxury-car-showroom-elegant-interior.jpg"
                    }
                    alt="Luxury showroom"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-muted/30 via-background to-muted/50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              {content.valuesTitle}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {content.valuesSubtitle}
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {content.values &&
              content.values.map((value: any, index: number) => {
                const IconComponent = getIcon(value.icon) || Award;
                return (
                  <ScaleIn key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="p-6 text-center space-y-4 hover:shadow-xl transition-all duration-300 h-full">
                        <motion.div
                          className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent/10"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <IconComponent className="h-7 w-7 md:h-8 md:w-8 text-accent" />
                        </motion.div>
                        <h3 className="text-lg md:text-xl font-bold">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {value.description}
                        </p>
                      </Card>
                    </motion.div>
                  </ScaleIn>
                );
              })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              {content.timelineTitle}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {content.timelineSubtitle}
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 md:space-y-8">
              {content.milestones &&
                content.milestones.map((milestone: any, index: number) => (
                  <AnimatedSection
                    key={index}
                    delay={index * 0.15}
                    direction="left"
                  >
                    <div className="flex gap-4 md:gap-6 items-start group">
                      <div className="flex flex-col items-center">
                        <motion.div
                          className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-xs md:text-sm shrink-0 shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {milestone.year}
                        </motion.div>
                        {index < (content.milestones?.length || 0) - 1 && (
                          <div className="w-0.5 h-full bg-border mt-4 min-h-[60px]" />
                        )}
                      </div>
                      <motion.div
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="flex-1 p-4 md:p-6 group-hover:shadow-xl group-hover:border-accent/50 transition-all duration-300">
                          <h3 className="text-lg md:text-xl font-bold mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {milestone.description}
                          </p>
                        </Card>
                      </motion.div>
                    </div>
                  </AnimatedSection>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-muted/50 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              {content.teamTitle}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {content.teamSubtitle}
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {content.team &&
              content.team.map((member: any, index: number) => (
                <ScaleIn key={index} delay={index * 0.15}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden text-center group hover:shadow-2xl transition-all duration-500 h-full">
                      <div className="relative h-56 md:h-64 overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.7 }}
                          className="w-full h-full"
                        >
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="p-6 space-y-2">
                        <h3 className="text-lg md:text-xl font-bold">
                          {member.name}
                        </h3>
                        <p className="text-accent font-medium text-sm md:text-base">
                          {member.role}
                        </p>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {member.bio}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </ScaleIn>
              ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              {content.certificationsTitle}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {content.certificationsSubtitle}
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
            {content.certifications &&
              content.certifications.map((cert: string, index: number) => (
                <AnimatedSection
                  key={index}
                  delay={index * 0.05}
                  direction="up"
                >
                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 hover:border-accent/50 transition-all duration-300"
                    whileHover={{ scale: 1.05, x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                    <span className="font-medium text-sm md:text-base">
                      {cert}
                    </span>
                  </motion.div>
                </AnimatedSection>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <ScaleIn delay={0.2}>
            <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-balance">
                {content.ctaTitle}
              </h2>
              <p className="text-lg md:text-xl opacity-90 text-pretty leading-relaxed">
                {content.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 w-full sm:w-auto group"
                    asChild
                  >
                    <Link href="/contact">
                      {content.ctaPrimaryButton}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 border-accent-foreground/20 hover:bg-accent-foreground/10 bg-transparent w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/fleet">{content.ctaSecondaryButton}</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>
    </div>
  );
}
