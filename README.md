# 🚀 Run the Page Locally Using Jekyll

First, install Ruby by following the instructions [here](https://www.ruby-lang.org/en/documentation/installation/).

To run the site locally, you can follow the official Jekyll setup guide [here](https://jekyllrb.com/),  
or simply use the commands below:

```bash
sudo gem install jekyll
sudo gem install rouge
jekyll serve
```

Once started, open your browser and go to `http://localhost:4000` to view the site.

---

# 🔄 Update Workflow

## 1. Clone the Repository and Create a New Branch

```bash
git clone https://github.com/postechsv/postechsv.github.io
cd postechsv.github.io
git checkout -b yourname
```

---

## 2. Make Changes and Push

😊 ...make your awesome edits...

```bash
git add .
git commit -m "Awesome change"
git push origin yourname
```

---

## 3. Submit a Pull Request on GitHub

Open GitHub and create a **Pull Request** from your branch.  
Once submitted, just wait for approval 👍

<img width="800" height="136" alt="image" src="https://github.com/user-attachments/assets/e4779023-79c2-4420-9539-64cf35c69554" />

<img width="800" height="400" alt="image" src="https://github.com/user-attachments/assets/6784431a-b675-434b-a849-70eb875f2ee9" />

---

## 4. Clean Up After Merge

Once your PR is merged, you can delete your working branch locally and remotely:

```bash
git branch -D yourname
git push origin --delete yourname
```


# Homepage Structure

## 📁 _data
홈페이지에서 사용하는 다양한 데이터 파일들을 저장합니다.

- `faculty.yml`  
  : 교수의 인적 사항을 저장. 현재는 홈페이지에 아이콘 형태로만 출력됨.
- `news.yml`  (/news)
  : 뉴스 페이지의 내용을 저장. 날짜순으로 자동 정렬됨. 메인 페이지에는 최신 8개만 출력.
- `publist.yml`  (/publications)
  : 출판 논문 리스트. 연도 및 파일 내 작성 순서에 따라 정렬됨.
- `students.yml`  
  : 학생의 인적 사항 저장 (LinkedIn, GitHub, 홈페이지 아이콘 유무).

## 📁 _home (/)
메인 페이지에 들어갈 섹션별 내용을 정의합니다.  
각 섹션은 `[XX-XXXX.md]` 형식의 Markdown 파일로 구성됩니다.

- `00-about.md`  
- `05-news.md`  
- … (추가 섹션 작성 가능)

## 📁 _research (/research)
리서치 페이지 구성용 디렉토리. `_home`과 동일한 방식으로 Markdown 파일을 구성합니다.

- `01-introduce.md`  
- `02-research-topics.md`  
- `04-video.md`

## 📁 _researchtopics (/research/*)
리서치 페이지 내 `research-topics` 섹션에 포함될 개별 연구 주제 항목을 저장합니다.  
새로운 문서를 작성하고 싶은 경우 00-SAMPLE.md 파일을 복사하여 사용합니다.

- `00_sample.md`  
- `...` (기타 연구 주제 파일)

## 📄 members.md (/members)
교수 및 학생 구성원 정보를 표시하는 단일 페이지.
