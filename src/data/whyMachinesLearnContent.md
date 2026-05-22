**[Read the full formatted article (HTML) →](/Personalwebpage/why_machines_learn_blog.html)**

*By Setegn Worku Alemu | Scientist, Statistical Genetics, ILRI Nairobi*

---

There is a book that completely changed how I see learning — not just in machines, but in myself.

I found it standing in the rain, halfway up one of the steepest streets in the world.

---

## The Moment I Found It

It was a foggy afternoon in Dunedin, New Zealand. I was walking up Baldwin Street — earbuds in, half-listening to a machine learning lecture as background noise for a rainy afternoon.

Then the speaker said something I had struggled with for years. Suddenly it felt completely obvious. Like someone had wiped a window I did not even know was dirty.

He mentioned Kilian Weinberger from Cornell — one of my favourite ML educators. I stopped dead in the rain and said out loud, to nobody:

*"What? What? What?"*

I pulled out my phone, water dripping down my face, and ordered the book immediately.

That book was ***Why Machines Learn*** by **Anil Ananthaswamy**.

I read it that week. Then went back and reread whole sections — not because they confused me, but because they were that good.

I am a quantitative geneticist. I work with predictive models, genomic data, and statistical algorithms every single day. Machine learning is not a casual interest — it is my professional world. I expected to skim it. Instead, it showed me things I had never properly seen.

---

## Who Is Anil Ananthaswamy — And Why It Matters

Anil is one of the finest science writers working today. He writes for *Nature*, *New Scientist*, and *Quanta Magazine*. But do not let the label "science writer" suggest he approached this book from the outside.

He watched Kilian Weinberger's full machine learning lecture series — the same lectures that stopped me on that hill in Dunedin. He learned Python alongside students at MIT, many of them half his age. He sought out and interviewed leading machine learning researchers from across the world, asking them the questions most practitioners never stop to ask.

Then he took everything he absorbed and wrote it in a way that any curious person can follow.

What I love most about Anil is that he gives full credit — to Kilian Weinberger, to the researchers he interviewed, to everyone who helped him understand. He never pretends he arrived at this alone. He makes himself a student throughout the book, not a guru. And somehow that honesty makes the book *more* authoritative, not less.

That kind of book does not come from talent alone. It comes from deep, stubborn passion for understanding something completely.

Geoffrey Hinton — the Godfather of deep learning and Nobel Prize winner — called this book a masterpiece. Having read it, I understand why.

---

## What Makes This Book Different

Most machine learning books fall into one of two traps.

**The first trap: oversimplification.** They give you warm, satisfying analogies that feel good until you push on them and they collapse. You finish feeling like you understood something — but when you try to explain it, nothing is actually there.

**The second trap: overwhelming technicality.** Equations from page one. Assumed prior knowledge. Dense prose that treats the reader as someone who already understands everything. You feel like you were supposed to study this before arriving.

*Why Machines Learn* does neither.

It builds understanding the way real learning happens — through repetition, layered exposure, and honest revisiting of ideas. Anil admits he worked through certain concepts five, six, seven times before they clicked. Rather than hiding that, he designs the entire book around it.

At the end of the prologue, he writes:

> *"I hope your neurons enjoy this process as much as mine did."*

That line stayed with me for weeks.

---

## Three Ideas That Rewired My Thinking

### 1. Learning Is Pattern Recognition — and Nature Invented It Long Before We Did

Think of a baby duckling.

In the first hours after hatching, it follows the first moving object it sees — usually its mother. But the Austrian zoologist Konrad Lorenz famously showed that if *you* are the first moving thing a gosling sees, it will follow you. Everywhere. Indefinitely. Lorenz had to walk across meadows with a line of geese trailing behind him like devoted students.

This is called imprinting. But the deeper point is not about the object.

The bird is not memorizing a shape. It is learning a *relationship* — "this moving thing is important, stay close to it." And when young birds encounter two similar-looking objects, they do not memorize either one. They learn the *concept of similarity itself* — and apply it to entirely new situations later.

A brain the size of a peanut. A few days old. Performing abstraction.

That is exactly what machine learning does. A neural network learning to recognize cats does not memorize ten thousand cat photos. It learns what features are consistently associated with "cat-ness" — and applies that generalized pattern to images it has never seen.

**Machine learning did not invent a new form of intelligence. It formalized something nature has been perfecting for hundreds of millions of years.**

That reframing changed how I see the entire field.

---

### 2. We Are All Just Numbers — and That Is Actually Liberating

Everything we experience — every image, every sound, every word, every idea — can be represented numerically. The tool that makes this possible is the **vector**.

I memorized vectors in school. i, j, k. Direction and magnitude. I could calculate them and pass the exam. But I never understood *why they were invented*. What problem were mathematicians actually trying to solve? Why did someone sit down one day and decide we needed this new language?

Anil fills in that history — and this is where the book genuinely surprised me.

#### Newton — Genius Without the Language

Isaac Newton, working in the 1600s, discovered the laws of motion and gravity using geometric intuition alone. No vectors. No algebraic notation as we know it today. He reasoned in shapes, diagrams, and pure geometric logic — and from that, he derived the foundations of classical mechanics.

Stop and sit with that for a moment.

The man described how planets orbit the sun, how objects fall, how force and acceleration relate — *without the mathematical language we now consider basic*. He built one of the greatest intellectual structures in human history using tools that, by modern standards, were almost primitive.

That is not a criticism of Newton. That is a measure of how extraordinary he was.

But here is what Anil helps you see: even Newton's genius had a ceiling without the right language. His geometric approach was brilliant but not scalable. You could follow his logic for two objects, maybe three. But as physics grew more complex — more dimensions, more variables, more interacting forces — pure geometric intuition ran out of room. It could not carry the weight of what physics was becoming.

Vectors came later, developed and formalized through the work of mathematicians like Hamilton, Grassmann, and Gibbs in the 1800s, because science needed a cleaner, more general language. A language that could describe direction and magnitude in any number of dimensions — not just the two or three our eyes can see.

#### What Anil Does That I Find Remarkable

This is where I want to pause and genuinely appreciate what Anil Ananthaswamy does in this book.

He could have simply introduced vectors as a tool — here is what they are, here is how they work, move on. Most textbooks do exactly that. But instead he asks: *where did this come from, and why did we need it?*

By placing Newton first — showing you the brilliance that existed *before* the language — he makes you feel the gap. You understand not just what vectors are but *why they had to be invented*. And then, quietly, he connects that 17th century problem to what a neural network does in 2024.

Newton could not have imagined that his struggle to describe motion without the right language would one day illuminate how a machine learns to recognize a face, translate a sentence, or predict a disease. He was solving a physics problem. He was unknowingly pointing at something universal — the idea that the right mathematical language does not just describe the world, it *unlocks* it.

That connection — from Newton's geometric intuition, to vectors, to modern AI — is not obvious. It takes a certain kind of mind to see it and a certain kind of writer to make it feel inevitable rather than forced. Anil does both.

#### What Vectors Actually Change

Once you can represent things as vectors, everything transforms:

- **Similarity becomes distance** — similar vectors sit close together in space; very different ones sit far apart
- **Difference becomes angle** — the angle between two vectors tells you precisely how much they diverge
- **Patterns become measurable** — relationships invisible to the naked eye become computable operations

This is how machines see our world. A photograph becomes a vector of millions of pixel values. A sentence becomes a point in high-dimensional semantic space. A patient's medical record becomes a location in a landscape of risk. And the algorithms we call "machine learning" are really just mathematics operating on those points — calculating distances, adjusting angles, finding patterns in a geometry we cannot visualize but can compute with extraordinary precision.

Without vectors, all of that stays invisible. With them, the relationships become computable.

Newton gave us the laws. The mathematicians who came after gave us the language. And now, three centuries later, that language is teaching machines to see.

**The mathematics stops feeling abstract. It starts feeling like the native language of reality.**

---

### 3. Repetition Is Not Failure — It Is the Architecture

This is the idea that hit me hardest. And most personally.

I used to get frustrated when I did not understand something on the first try. There was always a quiet voice underneath the frustration: *maybe this particular thing just is not for you.*

I have heard students say this. I have felt it myself many times.

Anil dismantles that feeling completely.

Throughout the book, he revisits the same ideas from multiple angles, adding a layer each time. Gradient descent appears in one chapter, then reappears in another with more context, then again with more depth. Not because the reader failed — but because that is how real understanding forms.

Both biological brains and artificial neural networks learn through thousands of small, gradual updates. No single pass is dramatic. No single exposure delivers the insight. But after enough iterations, something clicks. The structure becomes visible.

That is also how you learn anything genuinely difficult:

- You read it once and it half-lands
- You come back and it lands more solidly
- You explain it to someone and it lands differently again
- You see it in a new context and suddenly the whole thing is clear

**Learning is slow. That is not a bug. That is the architecture.**

Once you accept this — once you stop treating slowness as evidence of inadequacy — learning becomes far less stressful. And far more honest.

---

## A Personal Reflection — Seven Countries, One Pattern

After reading this book, I started thinking about my own life differently.

I began seeing myself as a learning system. A biological, carbon-based model continuously trained by experience. I know that is a simplification — the brain is incomparably more complex than any neural network we have built, and we cannot measure the weights. But the *direction* is right.

**Visiting a place updates you. Living there updates you differently** — deeper, longer, across more contexts, and in ways you cannot fully predict. It is the difference between a single gradient step and a full training epoch. Both move the model. But not equally.

I have lived and studied across seven countries and four continents. Looking back, each one was a training epoch of its own:

**Ethiopia** — where curiosity took root. Where I first fell in love with learning for its own sake, before I had any language for what I was doing.

**The Netherlands** — rewired me for precision. I arrived soft-spoken and indirect. I left direct and structured. A major weight update.

**America** — taught me speed. Ask the question. Try the thing. Do not wait for permission.

**Denmark** — slowed me down in the best way. Deep thinking, balance, trust in systems. A different kind of precision.

**Belgium** — taught me adaptability. Working across disciplines, across languages, across entirely different ways of framing the same problem.

**New Zealand** — standing in that rain on Baldwin Street — is where the pattern in my own life suddenly became visible. Where all the earlier epochs finally made sense as a single trajectory.

**Nairobi** — where I write this now. A city where the whole world seems to gather in one place. Where you are welcomed with a simple *Karibu nyumbani* — welcome home. Where the earlier epochs finally feel integrated.

None of those were visits. Each one was long enough that when I left, I was not the same model. And that is exactly what Anil argues learning is — not a single insight, but the accumulation of enough experience that something fundamentally shifts.

Calling a human life a neural network is a simplification, and I want to be honest about that. The brain is far more complex than any model we have built. We cannot measure the weights. But the direction is right: experience changes structure. Repetition strengthens connections. Loss updates the deepest layers.

The map is not the territory — but it helps you see the shape of it.

---

## Who Should Read This Book

**If you work in AI, data science, genomics, or any quantitative field** and want to genuinely understand what you are building — not just use the tools but grasp the ideas underneath them — read this book.

**If you are curious about machine learning but intimidated by the mathematics** — this is one of the best on-ramps available. Anil makes it feel human without making it feel hollow. Kilian Weinberger's lectures inspired Anil to write it; the same Kilian who inspired me to order it in the rain. That thread of generous teaching runs through everything.

**If you have ever felt that learning is too slow, too repetitive, or too frustrating** — this book will show you that is not a flaw in you. It is the mechanism. It is how understanding is built.

One honest note: if you are already deep in the technical literature, some early sections may feel slow. The book was not written for you first. But even then, the historical framing and the way Anil connects biology, mathematics, and cognition across disciplines is worth your time.

For everyone else — this is exactly the book the field needed.

---

## Final Thought

What strikes me most, looking back, is how Anil's own process mirrors the book's central argument. He did not arrive at this material easily. He watched the lectures. He wrote the code. He asked the experts. He revised his understanding five, six, seven times.

He learned it the slow way. Then he wrote it so you could learn it a little faster.

Read it slowly anyway. Let your neurons enjoy the process.

There is a quiet click that happens somewhere in the middle — when the history and the mathematics and the biology all start pointing in the same direction.

You will feel it.

---

*Setegn Worku Alemu is a Scientist in Statistical Genetics at the International Livestock Research Institute (ILRI) in Nairobi, Kenya. He works on genomic selection, genetic parameters, and AI applications in livestock breeding across Africa.*

*In the next post, I go deeper into Chapters 3 and 4 — gradient descent and probability. Optimization finds the best answer. Probability tells you how much to trust it. Together, they are the engine under almost everything modern AI does.*
