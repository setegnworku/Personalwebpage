export const stats = [
  { label: 'Publications', value: 50 },
  { label: 'Years Experience', value: 15 },
  { label: 'Collaborations', value: 25 },
  { label: 'Shiny Apps', value: 5 },
]

export const skills = [
  { name: 'Quantitative Genetics', pct: 95 },
  { name: 'AI & Machine Learning', pct: 88 },
  { name: 'Statistical Modelling', pct: 95 },
  { name: 'Model Development', pct: 92 },
  { name: 'Web Development', pct: 82 },
]

export const researchInterests = [
  'Genomic selection and prediction models in diverse species',
  'Implementation of applied genomic selection in international breeding programs',
  'Integration of multi-omics data for improved genetic predictions',
  'Statistical methods for complex trait analysis in livestock and crops',
  'Development of computational tools for large-scale genetic data analysis',
  'Climate-smart breeding strategies and genetic approaches to sustainability',
]

export const tools = [
  { category: 'Genetic Software', items: ['ASReml', 'BLUPF90', 'DMU', 'JWAS', 'GCTA'] },
  { category: 'Programming', items: ['R', 'Python', 'Julia', 'JavaScript'] },
  { category: 'Web & Viz', items: ['R Shiny', 'Django', 'Leaflet', 'D3.js'] },
]

export const shinyApps = [
  {
    icon: '🧬',
    title: 'Genomic Prediction using Functional SNP',
    desc: 'Integrates functional genomic information to enhance genomic prediction accuracy. Incorporates functional annotation data into prediction models.',
    url: 'https://setegn.shinyapps.io/Functional_genomics/',
    tag: 'Genomics',
  },
  {
    icon: '🔗',
    title: 'Linkage Disequilibrium for Crossbred Populations',
    desc: 'Analyzes and visualizes LD patterns in complex crossbred populations. Essential for understanding genetic architecture in admixed populations.',
    url: 'https://setegnmaths.shinyapps.io/Setegn_Iowa_LD/',
    tag: 'Population Genetics',
  },
  {
    icon: '🐔',
    title: 'Genomic Selection in Broiler',
    desc: 'Implements genomic selection models specifically tailored for broiler breeding programs, optimized for poultry genetic evaluation workflows.',
    url: 'https://setwork.shinyapps.io/Brolier_genomic_selection/',
    tag: 'Poultry',
  },
  {
    icon: '🌍',
    title: 'ACGG Project Data Analysis',
    desc: 'Comprehensive dashboard for analyzing and visualizing data from the African Chicken Genetic Gains project across multiple countries.',
    url: 'https://setegn21worku.shinyapps.io/Setegn-ACGG-Dashboard/',
    tag: 'Dashboard',
  },
  {
    icon: '🌡️',
    title: 'Climate-Integrated Genetic Analysis',
    desc: 'Incorporates climate data into genetic analyses to study gene-environment interactions and climate adaptation in livestock.',
    url: 'https://setegn21worku.shinyapps.io/ClimatedayaintegratedbySetegnworku/',
    tag: 'Climate',
  },
]

import whyMachinesLearnContent from './whyMachinesLearnContent.md?raw'

export const initialBlogPosts = [
  {
    id: 1,
    title: 'Why Machines Learn — A Book That Rewired How I Think',
    excerpt:
      'Standing in the rain on Baldwin Street, I ordered Anil Ananthaswamy’s book — and it reframed pattern learning, vectors, repetition, and seven countries of lived “training epochs.”',
    date: 'May 2026',
    readTime: '18 min read',
    category: 'tutorials',
    content: whyMachinesLearnContent,
  },
]
