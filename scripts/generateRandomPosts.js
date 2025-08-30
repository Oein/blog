#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample data for generating random posts
const titles = [
  "완벽한 웹 개발을 위한 가이드",
  "JavaScript의 새로운 기능들",
  "React vs Svelte 비교 분석",
  "TypeScript 마스터하기",
  "CSS Grid와 Flexbox 활용법",
  "Node.js 백엔드 개발 팁",
  "웹 성능 최적화 전략",
  "모바일 퍼스트 디자인 원칙",
  "API 설계 베스트 프랙티스",
  "개발자를 위한 Git 워크플로우",
  "데이터베이스 설계 패턴",
  "보안을 고려한 웹 개발",
  "테스트 주도 개발 TDD",
  "함수형 프로그래밍 입문",
  "마이크로서비스 아키텍처",
  "Docker와 컨테이너 기술",
  "클라우드 배포 전략",
  "오픈소스 기여하는 방법",
  "코드 리뷰 문화 만들기",
  "개발자 생산성 향상 도구들",
];

const categories = [
  "개발",
  "Frontend",
  "Backend",
  "DevOps",
  "Database",
  "Security",
  "Performance",
  "Design",
  "Career",
  "Tutorial",
];

const contentTemplates = [
  `# 소개

이 포스트에서는 {topic}에 대해 자세히 알아보겠습니다.

## 주요 내용

### 1. 기본 개념
{topic}의 기본적인 개념과 원리를 설명합니다.

### 2. 실제 적용
실무에서 어떻게 활용할 수 있는지 예제와 함께 살펴봅니다.

\`\`\`javascript
// 예제 코드
const example = () => {
  console.log("Hello, World!");
};
\`\`\`

### 3. 주의사항
개발 중 주의해야 할 사항들을 정리했습니다.

## 결론
{topic}를 통해 더 나은 개발자가 될 수 있습니다!`,

  `# {topic} 완벽 가이드

## 왜 {topic}인가?

현대 웹 개발에서 {topic}의 중요성이 날로 증가하고 있습니다.

### 장점
- 생산성 향상
- 코드 품질 개선
- 유지보수 용이

### 단점
- 학습 곡선
- 초기 설정 복잡성

## 단계별 학습 방법

1. 기본 문법 익히기
2. 실습 프로젝트 만들기
3. 커뮤니티 참여하기

\`\`\`bash
# 설치 명령어
npm install example-package
\`\`\`

마지막으로, 꾸준한 연습이 가장 중요합니다!`,

  `# {topic} 심화 학습

이번 포스트는 {topic}에 대한 심화 내용을 다룹니다.

## 핵심 개념들

### 개념 1: 기초
기본적인 이해가 필요한 부분입니다.

### 개념 2: 응용
실제 프로젝트에서 사용하는 방법을 알아봅시다.

### 개념 3: 고급
전문가 수준의 기법들을 소개합니다.

\`\`\`typescript
interface Example {
  name: string;
  value: number;
}

const data: Example = {
  name: "sample",
  value: 42
};
\`\`\`

## 실무 팁

- 항상 문서화하기
- 테스트 코드 작성하기
- 코드 리뷰 받기

이런 습관들이 좋은 개발자를 만듭니다.`,
];

const randID = () => Math.random().toString(36).substr(2, 9);

// Generate random posts
function generateRandomPosts(count = 10) {
  const contentsDir = path.join(__dirname, "contents");

  // Create contents directory if it doesn't exist
  if (!fs.existsSync(contentsDir)) {
    fs.mkdirSync(contentsDir, { recursive: true });
  }

  for (let i = 1; i <= count; i++) {
    // Random data selection
    const rid = randID();
    const title =
      titles[Math.floor(Math.random() * titles.length)] + ` (${rid})`;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const template =
      contentTemplates[Math.floor(Math.random() * contentTemplates.length)];

    // Generate random timestamp (within last 6 months)
    const now = Date.now();
    const sixMonthsAgo = now - 6 * 30 * 24 * 60 * 60 * 1000;
    const randomTimestamp =
      Math.floor(Math.random() * (now - sixMonthsAgo)) + sixMonthsAgo;

    // Create slug from title
    const slug = `random-post-${i}-${rid}`;

    // Generate content
    const content = template.replace(/{topic}/g, title);

    // Create the post content
    const postContent = `\\meta slug=${slug}
\\meta writeAt=${randomTimestamp}
\\meta title=${title}
\\meta category=${category}

${content}
`;

    // Write to file
    const fileName = `${slug}.nd`;
    const filePath = path.join(contentsDir, fileName);

    fs.writeFileSync(filePath, postContent, "utf8");
    console.log(`✅ Generated: ${fileName}`);
  }

  console.log(`\n🎉 Successfully generated ${count} random posts!`);
  console.log("\n📝 Generated posts:");

  // List all generated files
  const files = fs
    .readdirSync(contentsDir)
    .filter((file) => file.startsWith("random-post-") && file.endsWith(".nd"))
    .sort();

  files.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });
}

// Run the script
const count = process.argv[2] ? parseInt(process.argv[2]) : 10;
generateRandomPosts(count);
