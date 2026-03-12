export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "attentiongan-astronomical-image-denoising",
    title: "Astronomical Image Denoising Using AttentionGAN",
    excerpt: "A novel approach using CycleGAN with attention mechanisms to enhance astronomical images by removing noise while preserving important details.",
    date: "2023",
    readTime: "5 min read",
    category: "Research",
    tags: ["Computer Vision", "Deep Learning", "GAN", "Astronomy", "Image Processing"],
    content: `
# Astronomical Image Denoising Using AttentionGAN

## Abstract

This research presents a novel approach to astronomical image denoising using AttentionGAN, a generative adversarial network architecture enhanced with attention mechanisms. Traditional denoising methods often fail to preserve fine details in astronomical images, such as stars and nebulae. Our proposed method leverages CycleGAN's unpaired learning capability with attention modules to effectively remove noise while preserving critical astronomical features. Experimental results demonstrate significant improvements in both quantitative metrics and visual quality compared to existing approaches.

## 1. Introduction

Astronomical imaging presents unique challenges for image processing. When capturing faint celestial objects, astronomers must deal with various sources of noise:

- **Photon shot noise** - Inherent quantum fluctuations in light detection
- **Read noise** - Electronic noise from sensor readout
- **Thermal noise** - Heat-induced signals in detectors
- **Cosmic rays** - High-energy particle impacts

Traditional denoising methods like Gaussian filtering or median filtering often blur fine details - precisely the features astronomers care about most.

## 2. Methodology

### 2.1 CycleGAN Architecture

We built upon **CycleGAN**, which learns image-to-image translations without requiring paired training data. This is crucial for astronomical imaging where obtaining matched noisy/clean image pairs is extremely difficult.

### 2.2 Attention Mechanisms

The key innovation is integrating attention layers into the generator:

1. **Self-Attention Module** - Enables the model to focus on relevant spatial features across the entire image, helping distinguish between noise and actual astronomical features

2. **Channel Attention** - Emphasizes important feature channels, allowing the network to prioritize certain types of astronomical structures

3. **Residual Attention** - Helps preserve fine details while learning complex noise patterns

### 2.3 Loss Functions

The model uses multiple loss functions:

- **Adversarial Loss** - Ensures realistic output
- **Cycle Consistency Loss** - Maintains astronomical integrity
- **Perceptual Loss** - Preserves fine details using pre-trained VGG features

## 3. Experimental Results

### Dataset

- Generated synthetic noisy astronomical images
- Added varying levels of Gaussian noise (σ = 10, 20, 30)
- Used high-resolution star field and nebula images

### Quantitative Results

| Method | PSNR | SSIM |
|--------|------|------|
| BM3D | 28.45 | 0.85 |
| DnCNN | 30.12 | 0.89 |
| CycleGAN | 31.23 | 0.91 |
| **AttentionGAN** | **33.87** | **0.94** |

### Key Findings

1. **Noise Reduction** - Achieved 15% better noise reduction than CycleGAN
2. **Detail Preservation** - Maintained stellar objects with 94% SSIM
3. **Adaptability** - Successfully handled various noise levels

## 4. Visual Results

The AttentionGAN successfully:
- Removes background noise while preserving star points
- Maintains nebula structures without over-smoothing
- Handles varying noise levels without parameter tuning

## 5. Conclusion

AttentionGAN demonstrates that combining generative adversarial networks with attention mechanisms offers a powerful solution for astronomical image denoising. The approach successfully preserves critical astronomical details while effectively removing various noise sources.

This research was conducted as part of my Master's thesis at the University of Indonesia, combining my background in Astronomy with machine learning expertise.

---

*Read the full paper on [ResearchGate](https://www.researchgate.net/publication/388175752_Astronomical_Image_Denoising_Using_AttentionGAN)*
`
  },
  {
    slug: "deepct-irbert",
    title: "DeepCT-IRBERT: Hybrid Retrieval Pipeline for MS-MARCO",
    excerpt: "Combining the power of BM25 with DeepCT term weighting and IR-BERT contextual embeddings for improved document ranking.",
    date: "December 12, 2021",
    readTime: "8 min read",
    category: "Research",
    tags: ["Information Retrieval", "Deep Learning", "NLP", "IR-BERT", "DeepCT"],
    content: `
# DeepCT-IRBERT: Hybrid Retrieval Pipeline for MS-MARCO

## Introduction

In the field of Information Retrieval (IR), the challenge of effectively ranking documents remains a central problem. Traditional methods like BM25 have served as the backbone of retrieval systems for decades, while modern transformer-based models have shown remarkable semantic understanding capabilities. My research explores the synergy between these two approaches through a hybrid pipeline called **DeepCT-IRBERT**.

## The Problem

The MS-MARCO dataset presents a significant challenge for retrieval systems:
- **6,980 queries** or questions
- **1,000 candidate passages** per query
- Need to identify the most relevant passages

The goal is to maximize **MRR@10** (Mean Reciprocal Rank at 10), which measures how highly the first relevant document ranks in the top 10 results.

## Methodology

### DeepCT: Context-Aware Term Weighting

DeepCT, introduced by Dai & Callan (2019, 2020), represents a paradigm shift in term weighting. Instead of using traditional TF-IDF or BM25 term frequencies, DeepCT uses a deep learning model to learn context-aware term importance.

Key insights:
- Terms that are important in one context may be less important in another
- DeepCT can identify **semantic term importance** that traditional methods miss
- When used to reweight BM25 indexing, it significantly improves retrieval performance

### IR-BERT: Semantic Search with Transformers

IR-BERT, proposed by Deshmukh & Sethi (2020), leverages the power of BERT (and SBERT by Reimers & Gurevych, 2019) to capture semantic relationships between queries and documents.

Benefits:
- Understands **contextual meaning** beyond keyword matching
- Captures semantic similarity between query and passage
- Provides dense semantic representations

### The Hybrid Approach

My implementation combines:
1. **BM25 indexed with DeepCT term weighting** - leveraging learned term importance
2. **IR-BERT for first-stage retrieval** - capturing semantic understanding

This hybrid approach aims to get the best of both worlds:
- The **efficiency and recall** of sparse retrieval (BM25 + DeepCT)
- The **semantic precision** of dense retrieval (IR-BERT)

## Implementation Details

The project is implemented in Jupyter Notebook and includes:

1. **Data Loading**: MS-MARCO passage ranking dataset
2. **DeepCT Indexing**: Reweighting document terms using learned weights
3. **IR-BERT Encoding**: Generating dense embeddings for queries and passages
4. **Hybrid Fusion**: Combining scores from both approaches
5. **Evaluation**: Computing MRR@10 on the test set

## Key Findings

Through experimentation, I observed:

1. **DeepCT reweighting** significantly improves over raw BM25
2. **IR-BERT** provides strong semantic matching but can miss exact keyword matches
3. **Hybrid approaches** that combine both methods tend to perform best

## References

- Dai, Z. & Callan, J. (2019). Deeper Text Understanding for IR with Contextual Neural Language Model
- Dai, Z. & Callan, J. (2020). Context-Aware Document Term Weighting for Ad-Hoc Search
- Deshmukh, A. & Sethi, U. (2020). IR-BERT: Leveraging BERT for Semantic Search
- Reimers, N. & Gurevych, I. (2019). Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks

## Conclusion

The DeepCT-IRBERT hybrid pipeline demonstrates that combining traditional IR techniques with modern deep learning can yield powerful results. The key insight is that **different retrieval methods capture different aspects of relevance**, and thoughtfully combining them can outperform any single approach.

This research was conducted as part of my Master's degree in Computer Science at the University of Indonesia, focusing on Generative AI and Information Retrieval.

---

*Would you like to explore the implementation? Check out the [GitHub repository](https://github.com/faishalzk/DeepCT-IRBERT) for the full code.*
`
  }
];
