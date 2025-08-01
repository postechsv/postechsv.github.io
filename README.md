## Run the page locally using Jekyll
First, install ruby [here](https://www.ruby-lang.org/en/documentation/installation/).  

To run it locally, follow instruction [here](https://jekyllrb.com/) to install Jekyll or use command below.  
Then run `jekyll serve` to see in `localhost:4000`. Here is a brief install guidelines.  

```bash
sudo gem install jekyll
sudo gem install rouge
jekyll serve
```


## Update Workflow
### Clone and checkout
```
git clone https://github.com/postechsv/postechsv.github.io
cd postechsv.github.io
git checkout -b yourname
```

### Work and push
😊... edit code ...

```
git add .
git commit -m "Awesome change"
git push origin yourname
```

# Submit PR on GitHub
<img width="800" height="136" alt="image" src="https://github.com/user-attachments/assets/e4779023-79c2-4420-9539-64cf35c69554" />

<img width="700" height="400" alt="image" src="https://github.com/user-attachments/assets/6784431a-b675-434b-a849-70eb875f2ee9" />

Once you're done, just wait for approval👍.

# Delete after merge
```
git branch -D yourname
git push origin --delete yourname
```
