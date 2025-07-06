---
title: 'Coding with AI'
description: 'GitHub Copilot'
pubDate: 'July 6 2025'
heroImage: '/002-githubcopilot.png'
---

I, normally, use `GitHub Copilot`, `OpenAI ChatGPT`, `Microsoft Copilot` and bunch of other AI tools in my life continuously. On top of that I am actively checking other tools like `Cursor`, `Jetbrains AI Assistant`, `Amazon Q` and other web based services. When my 3d printer fails, I use AI to detect the problem, then ask it to same or another AI for a solution and debugging process. I use AI to translate ingredients for product to English. 

I’ll definitely use ChatGPT to fact-check what I write in this blog today, and I’ll ask it multiple times to help revise the text. I recommend you do the same—things might have changed by the time you read this. You can also use AI tools to summarise it, since I can get a bit wordy sometimes

Today, we are going to deep dive into LLM's history, but hopefully not too deep. We are going to then start talking about GitHub Copilot. I know there are other tools, but my experience is mostly with GitHub Copilot so I will talk about things that I have idea of and experince with, and leave other toolsets to people who has experience on them. If you ask why LLM chit chat is needed instead of deep diving to Copilot, because LLM is what powering it.

### What is LLM?
LLM stands for Large Language Models and there is a bit of history to understand. I am not going to too deep but understanding internals of tools we use, can help using them better. 

##### Early Days of Rules and Grammar based systems. 
Hand-crafted rules written by linguists and programmers. Focus was on syntax trees and grammar parsing. Limitations of this era was, it could not scale, hard to cover messy real-world language and brittle to edge cases. [Eliza](https://en.wikipedia.org/wiki/ELIZA) can be an example of this era.

##### Statistical NLP, The Era of N-grams. 
What is an N-gram? A contiguous sequence of N words or tokens is `N-gram`. E.g., in the sentence “I am learning NLP”, a 2-gram (bigram) model considers: `("I", "am")`, `("am", "learning")`, etc. How it worked? It counts word co-occurrences in large corpora, then predict the next word based on frequency. For example, given `“I am”`, predict `“learning”` if that combination appears often. Used in early stages of autocomplete, spell checkers, machine translation. Google Search. It is very limited to context and it has no understanding of the meaning. Example can be [Markov models](https://sookocheff.com/post/nlp/ngram-modeling-with-markov-chains/).

##### The Neural Turn: Word Embeddings and Recurrent Networks
Breakthrough comes with the move from discrete word tokens to dense vector representations called embeddings. `Word2Vec`, `GloVe` and `FastText` are some of key models. `Recurrent Neural Networks`(`RNN`) and `Long Short-Term Memory`(`LSTMs`) allowed modeling sequences with memory, improving language understanding but still limited by slow training and short context windows. Limitations are that they couldn’t handle long dependencies well, training was expensive and parallelization was hard.

##### The Transformer Revolution
A major breakthrough came in 2017 with the paper [Attention Is All You Need](https://arxiv.org/abs/1706.03762), which introduced the Transformer architecture. Unlike earlier models like RNNs or LSTMs, Transformers use self-attention to process all tokens in a sequence simultaneously, allowing them to model long-range dependencies more effectively and efficiently.

This architecture made it possible to train much larger models on much larger datasets using modern GPUs and TPUs. It led to a new wave of state-of-the-art models such as:
- BERT (Bidirectional Encoder Representations from Transformers) – optimized for understanding and classification tasks.
- GPT (Generative Pre-trained Transformer) – optimized for generating coherent, context-aware text.

Transformers revolutionized NLP and significantly improved performance across tasks like translation, summarization, question answering, and eventually — programming code generation


##### From Natural Language to Code
Once Transformers proved highly effective at generating human language, researchers began applying the same architecture to source code, which is also a structured and logical language. Specialized models like:
- OpenAI Codex (used in early GitHub Copilot),
- CodeBERT, StarCoder, and others,

...were trained on billions of lines of public code from platforms like GitHub. These models learned syntax, common libraries, idioms, and even documentation styles, enabling them to generate and understand code across many languages.

Later, general-purpose models like GPT-4—though not solely trained on code—also demonstrated em performance on code-related tasks, including code generation, debugging, and inline documentation. GPT-4 now powers tools like GitHub Copilot Chat, combining both language understanding and coding ability.

This marked the rise of LLMs for developers, making it possible for tools like Copilot to:
- Suggest entire code blocks,
- Write functions from comments,
- Understand cross-file context, and
- Act as real-time AI assistants in modern development environments.

### GitHub Copilot

GitHub with partnership with OpenAI built GitHub copilot. It is available on VS Code, JetBrains, Neovim and bunch of other developer tools. It does context-aware AI code suggestions, completion, and documentation generation and some agentic capabilities. 

##### What are the benefits?
- For learning:
    - <em>Learn by Example</em> : See idiomatic code patterns as you type.
    - <em>Discover New APIs</em> : Type a comment or partial code and watch Copilot suggest how to use unfamiliar libraries or tools.
    - <em>Language Exploration</em> : Quickly grasp how things are done in languages you’re not fluent in (e.g. Rust, Go, Bash).
    - <em>Inline Documentation Aid</em> : It suggests docstrings and comments that help reinforce what your function is doing.
    - <em>Explain Concepts (with Copilot Chat)</em> : Ask Copilot to explain code blocks, regular expressions, or refactor logic step by step.
- For building:
    - <em>Faster Coding</em> : Generate entire functions, classes, or boilerplate from a few words.
    - <em>Prototype Quickly</em> : Use comment-driven prompts to draft a solution fast, then refine it.
    - <em>Scaffold Tests</em> : Write test names and let Copilot suggest common assertions and setups.
    - <em>Multilingual Support</em> : Works across most popular languages and stacks.
    - <em>Stay in Flow</em> : Avoid distractions from tab-switching or Stack Overflow dives.
    - <em>Autocompletes Repetitive Logic</em> : Perfect for CRUD operations, validators, and form handling.
- For maintaining:
    - <em>Understand Legacy Code Faster</em> : Copilot can infer what a function is doing and suggest comments or docstrings.
    - <em>Write Refactors with Confidence</em> : Start typing a refactor, and Copilot helps complete it consistently.
    - <em>Consistency Across Files</em> : Copilot tends to follow patterns in your codebase.
    - <em>Reduce Human Error</em> : Autocompletion reduces typos, syntax errors, and missed edge cases.
    - <em>Debug with Copilot Chat</em> : Ask why something is breaking, and get a natural language explanation or fix suggestion.
- Smarter Dev Experience:
    - <em>You Still Own the Code</em> : Copilot suggests — you decide.
    - <em>Keeps You Sharp</em> : Seeing multiple ways to write code helps you improve.
    - <em>Great for Pairing</em> : Copilot acts as a silent partner who never sleeps.

##### What Are Its Limitations?
GitHub Copilot is powerful but not perfect. Here are some important limitations to keep in mind:
- Suggestions aren’t always correct or secure. It may generate outdated, inefficient, or vulnerable code. Always review and test thoroughly.
- Limited understanding of full project context. Copilot mainly works with local file context and cannot fully grasp your entire codebase or business logic.
- May produce verbose or repetitive code. Sometimes it suggests naive or suboptimal solutions.
- Not a replacement for domain knowledge or architecture. It’s a coding assistant, not a designer or architect.
- Data privacy concerns. Be cautious about sharing sensitive or proprietary code, especially with cloud-connected AI tools.

##### Why Developers Shouldn’t Be Afraid?
Fear of AI replacing developers is common but largely misplaced when it comes to tools like GitHub Copilot and AI agents:
- Copilot and AI agents don’t write your software independently. They are intelligent assistants that accelerate your work but still require your oversight and decision-making.
- You remain in control. You decide which suggestions or automated actions to accept, modify, or reject. AI agents can automate tasks, but only within boundaries you set.
- They reduce tedious and repetitive work, freeing you to focus on creative problem-solving, architecture, and higher-level thinking.
- Being AI-empowered is becoming an essential modern developer skill. Embracing AI tools and agents keeps you competitive and relevant in the evolving tech landscape.
- Collaboration with AI tools and agents is like working with a highly skilled junior developer or assistant who never tires. You’re not losing your job — you’re gaining a powerful partner to help you build better software faster.
- AI agents add new possibilities by automating workflows, managing dependencies, or even running tests, but they still rely on your expertise for guidance and validation.

##### Tips to Get the Most Out of Copilot
- <em>Write clear, descriptive comments</em> : Copilot uses natural language cues to understand your intent. Well-written comments can guide it to generate more accurate and relevant code.
- <em>Use meaningful function and variable names</em> : Good naming provides context that helps Copilot produce suggestions aligned with your code’s purpose and style.
- <em>Experiment with different prompts for complex code</em> : When working on tricky logic or unfamiliar APIs, try phrasing comments or partial code differently to get varied suggestions. This can spark creative or more optimal solutions.
- <em>Review all generated code carefully</em> : Copilot’s suggestions aren’t guaranteed correct or secure. Always read, test, and adapt the generated code before integrating it.
- <em>Combine Copilot with Copilot Chat</em> : Use Copilot Chat for interactive assistance—ask it to explain code, suggest fixes, or help refactor, turning it into a conversational coding partner.
- <em>Pair Copilot with solid testing and code reviews</em> : Maintain high code quality by writing tests and reviewing AI-generated code just as you would human-written code.
- <em>Customize your editor shortcuts and settings</em> : Tailor how you accept, reject, or cycle through suggestions to fit your workflow, making your interaction with Copilot as seamless as possible.

### Personal Experience
I would like to share my experience with GitHub Copilot on my side project up until now. I think it can be learning experience. I have come up with this project idea, that involves a dotnet API, angular SPA and some sensors as IoT.

##### Initial Solution Design
I decided to follow Clean Architecture with CQRS implmeneted via MediatR. While creating initial stage and integrating with packages I haven't experience before, I use copilot to help me implement the best practices. One example is that integrating Fluent Validation with MediatR pipelines so that I wouldn't need to instantiate validators directly by calling constructor. Another example comes from caching via using MediatR pipelines, that enabled me interatively implement caching for the entities I see valueble.

##### Refactoring
When I initially setup the architecture, I did not directly choose CQRS and benefit MediatR. It comes after six month of initial commit. I was using `...Service` that was service of Application layer, with beefy constructor injections and everytime change something, bunch of other tests were failing because of granularity of the application layer was not exist.

I decided to replace application services with MediatR handlers, and again iteratively I implement handlers with a structure. While refactoring Application layer, I benefit the consistency of my code with GitHub Copilot chat, reduced the amount of code I supposed to write. At the time I was not using chat, intelligent suggestions was following new structure and I was tab completing the suggestions and I think I was `tab refactoring` my application from time to time when I didn't use chat mode.

There are times you are not in Production yet and want to rename one or couple things system-wide, I was no different. I had three thing in my mind, need to be renamed and be more customer focused instead of tech focused. While doing this renaming on FE and BE, tab completion after I rename the files come quite handy.

##### Repetative Workflow
Very recently I decided to create couple of prompt files as part of my feature development. Normally when I want to implement a new form, I follow the following steps:
1. Create an entity and set relations to parent entity, in Domain Layer of BE
2. Create IRepository and Repository for the entity, handle overloads for access and deleted checks, in Domain and Infrastructure layers of BE
3. Dependency injection setup for IRepository to Repository for new entity, in Infrastructure layer of BE
4. Change DBContext and create migrations with ef cli or IDEs help, in Persistance layer of BE
5. Create resuable models of entity in Application layer that can represent summary and details of entity, in Application layer of BE
6. Create command, handler and validator for Creating and Updating the entity, with MediatR, in Application layer of BE
7. Create command and handler for Deleting the entity, with MediatR, in Application layer of BE
8. Create query and handler for Getting single the entity, with MediatR, in Application layer of BE
9. Create query and handler for Listing bunch of entities, with MediatR, in Application layer of BE
10. Create DTOs and APIs for CRUD of entity, in Presentation layer of BE
11. Use nswag to generate FE models and service proxies
12. Create details page in FE and implement needed details
13. Create list page in FE and implement needed details
14. Configure routing for new components
15. Integrate new components to menu and other components

For each entity in the application, these steps are followed to create functionality for it. What I did recently is that I create custom prompt files:
1. `createentity.prompt.md` handles steps from 1 to 4 from list, using agent mode
2. `createcqrs.prompt.md` handles 4 to 9 from list, using agent mode
3. `createapis.prompt.md` handles 10 from list, using agent mode
4. `createcomponents.promp.md` handles 12 to 14 from list, using agent mode

With this prompt files running in agent mode, I just manually run `nswag` tool at step 11, and write couple of line for step 15 to finish whole thing that used to take 8 to 10 hours, now can be done in nearly in an hour. Creating these prompts, of course, took some time. I use the time for one of the feature I should implement, to create these prompts and test, then next feature took only 1 hour, as shown below:

<img width="650px;" src="/002-2githubcopilot.png">


##### Testing
I used copilot chat to implement unit tests all over the place. I have command and query handlers and I implement unit tests aggressively around them. They all follow similar pattern about user access and null check. So, if I have `getstaffqueryhandler` need to be tested and I already have `getmanagerqueryhandlertests` exist, I give this context to copilot chat. I give what file I want it to write test for, then mention it follows similar structure of `getmanagerqueryhandler` and its tests exist as `getmanagerqueryhandlertests` as part of my prompt. Then I have very consistent tests created with a consistent test class name.

When I want to start doing integration tests, agent mode was available and I asked it to create integration test for authentication controller with test containers. With some small refactoring, it was really useful tests. Then I turn some of it test base for creating different user for each api set. 

I start experimenting with `Cypress` FE tests. I did not want to mock APIs so I dockerised my back end and its dependencies with `docker-compose`. I, of course, use copilot for this. Then I start setting up initial `login` behaviour tests. 

##### New Codebase Exploration
Either it is legacy old codebase or a new project you are bit late to the party for, developers may not have time for documentation, so one thing can help is that GitHub Copilot Chat. You can ask repository wide questions to GitHub Copilot. If there are some readme files, it will benefit them as well. You can use copilot as your guide and deep dive to code more structurely without getting lost. It will not frustrate nor be busy for you like other developers might be.

### What’s Not Covered (Yet)
GitHub Copilot and its ecosystem have rapidly evolved, and this post only scratches the surface. Here are some important areas and features that are not fully discussed here, but worth exploring in future deep dives:
- Custom Instructions: Tailor how GitHub Copilot behaves by setting preferences on tone, style, or types of suggestions it should prioritize. Think of it like giving Copilot a personality or development philosophy to follow.
- Prompt Engineering & Prompt Files (Deep Dive): While I introduced how I use prompt files to automate workflows, a more detailed breakdown of how to structure effective prompts, chain them, or adapt them across projects deserves its own dedicated guide.
- Agent Mode: A more autonomous mode where Copilot (or ChatGPT-based agents) execute multiple steps across your workspace. In my case, prompt files leveraged agent mode for chained tasks — but this opens the door to more advanced agent-based development.
- Coding Agents: Beyond Copilot’s autocomplete, coding agents can act like autonomous developers, capable of reading a spec, planning tasks, editing files, and even creating PRs. These are still emerging but already show promising real-world value.
- MCP (Model Customization Platform): GitHub's platform (in preview/early access) for organizations to fine-tune Copilot on their private codebase, ensuring that code suggestions align with internal libraries, naming conventions, and architectural patterns.
- Copilot Workspace: A transformative feature that goes beyond suggestions — it helps translate GitHub issues directly into planned code changes, complete with multi-file edits and suggested commits. Still in preview, but worth watching closely as it pushes Copilot into more agentic workflows.
- GitHub Copilot CLI

### Copilot Learning Materials
- GitHub Documentation – [GitHub Copilot](https://docs.github.com/copilot) 
- MS Learn [GitHub Copilot Fundamentals P1](https://learn.microsoft.com/en-us/training/paths/copilot/)
- MS Learn [GitHub Copilot Fundamentals P2](https://learn.microsoft.com/en-us/training/paths/gh-copilot-2/)
- MS Learn [App Dev by using Github Copilot](https://learn.microsoft.com/en-us/training/paths/accelerate-app-development-using-github-copilot/)

### Further Reading
- ELIZA – [Wikipedia](https://en.wikipedia.org/wiki/ELIZA)
- Markov Models – [Sookocheff.com: N-gram Modeling with Markov Chains](https://sookocheff.com/post/nlp/ngram-modeling-with-markov-chains/)
- Jurafsky & Martin – [Speech and Language Processing (Chapter 3: N-grams)](https://web.stanford.edu/~jurafsky/slp3/3.pdf)
- Google Research – [The Unreasonable Effectiveness of Data (2009)](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/35179.pdf)
- Word2Vec (Mikolov et al., 2013) – [Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/abs/1301.3781)
- GloVe (Stanford NLP) – [GloVe Project Page](https://nlp.stanford.edu/projects/glove/)
- FastText (Facebook AI) – [FastText Introduction](https://fasttext.cc/)
- LSTM Networks – [Understanding LSTM Networks (Colah’s Blog)](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)
- Vaswani et al. (2017) – [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- Jay Alammar – [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- BERT – [BERT: Pre-training of Deep Bidirectional Transformers](https://arxiv.org/abs/1810.04805)
- GPT-1 (Radford et al.) – [Improving Language Understanding by Generative Pre-Training (PDF)](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf)
- OpenAI – [OpenAI Codex & GitHub Copilot (Blog)](https://openai.com/blog/openai-codex)
- CodeBERT – [CodeBERT: A Pre-Trained Model for Programming and Natural Languages](https://arxiv.org/abs/2002.08155)
- StarCoder – [Introducing StarCoder (Hugging Face Blog)](https://huggingface.co/blog/starcoder)
- GPT-4 Technical Report – [GPT-4 Technical Paper](https://openai.com/research/gpt-4)
