// The verified list of YouTube IDs identified in the previous session audit
const candidateList = [
  // Khan Academy / Pixar in a Box
  { id: '1rMnzNZkIX0', topic: 'Intro to Storytelling' },
  { id: '1mTO_ax-M3Q', topic: 'We are all storytellers' },
  { id: 'm5AW93Ya0UE', topic: 'What If?' },
  { id: 'tREPH6hJsYg', topic: 'World & Character' },
  { id: 'NL0KQu9JiDQ', topic: 'Advice for storytellers' },
  { id: 'ngZQUebMSEg', topic: 'Character Development' },
  { id: 'RgRfbvLkvnI', topic: 'Wants vs Needs' },
  { id: 'ZyNvgFmBQTs', topic: 'Obstacles' },
  { id: 'WJ_iNkkgdCA', topic: 'Stakes' },
  { id: 'SgGARYH2vRg', topic: 'Character Advice' },
  { id: 'eCxo5PqI2bU', topic: 'Structure: Act 1' },
  { id: '9BusKC3kcb8', topic: 'Structure: Act 2' },
  { id: 'ilDsFrcHsuI', topic: 'Story Spine' },
  { id: 'bKrCKg9ggVI', topic: 'Story Structure' },
  { id: 'g1p3WmulKbs', topic: 'Visual Language' },
  { id: 'Uty6buQ61ZA', topic: 'Film Grammar' },
  { id: '74snIJ2eu7A', topic: 'Pitching and Feedback' },
  { id: 'pOeaflcMlVU', topic: 'Art of Lighting' },
  { id: '0DXZvcfPVrk', topic: 'Color Science' },
  { id: 'LswXfRF-o70', topic: 'Virtual Cameras' },
  { id: 'NEzJH-JrAdw', topic: 'Rendering' },
  { id: 'QOc8PMB7GWU', topic: 'Rigging' },
  { id: 'vkdnzcbeEFQ', topic: 'Rigging 2' },
  { id: 'lR0kyOdT86E', topic: 'Sets & Staging' },
  { id: '5RL64wceWGI', topic: 'Crowds' },
  { id: 'zMQhuo3QYIg', topic: 'Animation' },
  { id: 'KxM05gLQ654', topic: 'Linear interpolation' },
  { id: 'G7sxV2G-OEo', topic: 'Bezier curves' },

  // TED-Ed Public Speaking 101 Series (Complete Episodes 1–11)
  { id: 'Z7bfPaTfU0c', topic: 'Ep 1: What happens when you share an idea?' },
  { id: 'nzOdAVgyi0U', topic: 'Ep 2: How to uncover your best ideas' },
  { id: 'btWlBHE0pe4', topic: 'Ep 3: How to communicate clearly' },
  { id: '1sOgYNgq88E', topic: 'Ep 4: What\'s the best way to give a presentation?' },
  { id: 'PJKeLD-vMvo', topic: 'Ep 5: How to speak with meaning' },
  { id: 'mGugp5qs6Vg', topic: 'Ep 6: 5 ways to connect with people' },
  { id: 'JOs-q7rXqdk', topic: 'Ep 7: 4 ways to tell a great story' },
  { id: 'EMbZ72cCAzI', topic: 'Ep 8: How to explain something complicated' },
  { id: 'G3hXvByzLHs', topic: 'Ep 9: 6 ways to be more persuasive' },
  { id: '1uTRlM6MbMo', topic: 'Ep 10: How to present your ideas effectively' },
  { id: 'bw5tzcoEG88', topic: 'Ep 11: How to effectively use visuals in your presentation' },

  // TED Talks on Storytelling / Narrative Craft
  { id: 'KxDwieKpawg', topic: 'Andrew Stanton: Clues to a great story' },
  { id: 'D9Ihs241zeg', topic: 'Chimamanda Adichie: Danger of a Single Story' },
  { id: '4_RUgnC1lm8', topic: 'Kurt Vonnegut: Shapes of Stories' },
  { id: 'Nj-hdQMa3uA', topic: 'David JP Phillips: Magical science of storytelling' },
  { id: 'Iwpi1Lm6dFo', topic: 'David JP Phillips: PowerPoint' },
  { id: 'eIho2S0ZahI', topic: 'Julian Treasure: How to speak so people listen' },
  { id: '-FOCpMAww28', topic: 'Chris Anderson: Secret to public speaking' },
  { id: '1nYFpuc2Umk', topic: 'Nancy Duarte: Structure of greatest communicators' },
  { id: 'Ks-_Mh1QhMc', topic: 'Amy Cuddy: Body language' },
  { id: 'u4ZoJKF_VuA', topic: 'Simon Sinek: Start with why' },
  { id: 'rrkrvAUbU9Y', topic: 'Dan Pink: Motivation' },
  { id: 'c0KYU2j0TM4', topic: 'Susan Cain: Introverts' },
  { id: 'arj7oStGLkU', topic: 'Tim Urban: Procrastinator' },
  { id: 'R1vskiVDwl4', topic: 'Celeste Headlee: Conversation' },
  { id: 'Oo2upU6ny-I', topic: 'Kelly D. Parker: Persuasive storytelling' },
  { id: 'ZmNpeXTj2c4', topic: 'Jenny Hoyos: 60 seconds story' },
  { id: 'sh1-9xMZIfQ', topic: 'Andrea Gibbs' },
  { id: 'P2CVIGuRg4E', topic: 'Will Storr: Science of storytelling' },
  { id: 'iCvmsMzlF7o', topic: 'Brené Brown: Vulnerability' },
  { id: 'iIiAAhUeR6Y', topic: 'Malcolm Gladwell' },
  { id: '86x-u-tz0MA', topic: 'Elizabeth Gilbert' },
  { id: 'iG9CE55wbtY', topic: 'Ken Robinson' },
  { id: 'WRS9Gek4V5Q', topic: 'Ethan Hawke: Permission to be creative' },
  { id: 'hg3umXU_qWc', topic: 'Adichie: Feminism' },
  { id: '0snNB1yS3IE', topic: 'Sarah Kay' },
  { id: 'Us70DN2XSfM', topic: 'Clint Smith' },
  { id: 'ORYKKNoRcDc', topic: 'Rives: 4 AM' },
  { id: 'RoEEDKwzNBw', topic: 'Tyler Cowen: Suspicious of stories' },

  // Lessons from the Screenplay / Craft
  { id: 'tvqjp1CxxD8', topic: 'Three Act Structure - StudioBinder' },
  { id: 'j56WPBaiPYQ', topic: 'The Avengers - Defining an Act' },
  { id: 'bgLSgFDMF1k', topic: 'Good Will Hunting - Psychology of Character' },
  { id: 'CF3lFPW4E1o', topic: 'Gone Girl - Screenwriter' },
  { id: '8IAGH6k17nw', topic: 'The Social Network - Sorkin/Structure' },
  { id: 'EXeTwQWrcwY', topic: 'The Dark Knight - Antagonist' },
  { id: 'ba-CB6wVuvQ', topic: 'Whiplash vs Black Swan' },
  { id: 'gsIQa7sH5_Y', topic: 'Rogue One vs Force Awakens' },
  { id: 'AJLHsXw-LFI', topic: 'Get Out - Perspective in Horror' },
  { id: 'QTxvzkwVsQE', topic: 'Arrival - Adaptation' },
  { id: 'he3x5flTFPg', topic: 'Parasite - Symbols' },
  { id: 'S0QMxzEVuDI', topic: 'Collateral - Midpoint Collision' },
  { id: 'AvtOY0YrF-g', topic: 'Inglourious Basterds - Suspense' },
  { id: 'NdSGZ-RNdTw', topic: 'The Matrix - Exposition in Action' },

  // StudioBinder Craft Videos
  { id: 'CS1QkWSnP_o', topic: 'Character Arc - Positive Change' },
  { id: 'hjEO3ijVwSU', topic: 'Michael Corleone - Corruption Arc' },
  { id: '0txdzPfC-Ow', topic: 'Back to the Future - Flat Arc' },
  { id: 'AyML8xuKfoc', topic: 'Camera Shots' },
  { id: 'qQNiqzuXjoM', topic: 'Camera Framing' },
  { id: 'ZNRQQi42CZA', topic: 'Shot List 1' },
  { id: 'BdyhNmVFXdw', topic: 'Shot List 2' },
  { id: 'r2nD_knsNrc', topic: 'Cinematic Lighting' },
  { id: 'wrR8ggeD4h4', topic: 'Writing Subtext' },
  { id: '6PLSJBTzaGw', topic: 'Anatomy of a Screenplay' },
  { id: '17Gxgo9kPAQ', topic: 'Create/Import Screenplay' },
  { id: 'lINVnA3rVIE', topic: 'Color Theory Ep5' },
  { id: 'LxtPRqiFpe0', topic: 'Script Breakdown 1' },
  { id: 'a3Lx9zlzCQk', topic: 'Script Breakdown 2' },

  // The Moth Storytelling Videos
  { id: 'qdBJ1X33rXM', topic: 'Anthony Griffith' },
  { id: 'SBEm2r0VXc4', topic: 'Moth Behind the Storytellers' },
  { id: 'qvkIiUJsF68', topic: 'Essence of Storytelling' },
  { id: 'xqfZaXHl4qg', topic: 'Kevin McGeehan' },
  { id: 'r8jCcv2QIwM', topic: 'Matthew Dicks 1' },
  { id: '6SPPyyfgyp4', topic: 'Matthew Dicks 2' },
  { id: 'TcUIe3DUZtg', topic: 'Julia Lechner' },
  { id: 'vt24Kj2MK_k', topic: 'Ophira Eisenberg' },
  { id: 'RjtrH8dFgpM', topic: 'Edgar Oliver' },
  { id: 'j3qdBiKz-64', topic: 'Molly Ringwald' },
  { id: '9rgGTRSgiqs', topic: 'Gil Reyes' },
  { id: '5wLHv_MphNA', topic: 'Adam Gopnik 1' },
  { id: 'vc-oxQOBs4s', topic: 'Adam Gopnik 2' },
  { id: 'uAQ98KPLGWk', topic: 'Malcolm Gladwell at The Moth' },
  { id: 'dXRsPlhx5ao', topic: 'Tig Notaro' },
  { id: 'XhCQq10H78I', topic: 'Siddhartha Mukherjee' },
  { id: 'emr9gnwbogA', topic: 'Meg Wolitzer' },

  // TED-Ed Writing & Literature / Mythology
  { id: 'NSL55lOwznU', topic: 'Jane Austen' },
  { id: 'A0edKgL9EgM', topic: 'Art of the Metaphor' },
  { id: 'Hhk4N9A0oCA', topic: 'What makes a hero?' },
  { id: 'MEjgDeSnBMs', topic: 'Anti-hero of one\'s own' },
  { id: 'ZQTQSbjecLg', topic: 'How to build a fictional world' },
  { id: 'xjKruwAfZWk', topic: 'Make writing suspenseful' },
  { id: 'RZFYuX84n1U', topic: 'Dramatic irony' },
  { id: 'RSoRzTtwgP4', topic: 'Write descriptively' },
  { id: 'B5vEfuLS2Qc', topic: '1st vs 2nd vs 3rd person' },
  { id: 'flthk8SNiiE', topic: '3 anti-social skills / dialogue' },
  { id: 'IiR-bnCHIYo', topic: 'Verbal irony' },
  { id: 'tqg6RO8c_W0', topic: 'Situational irony' },
  { id: 'U_u91SjrEOE', topic: 'Prometheus' },
  { id: 'XvUHcsZOhJ8', topic: 'Arachne' },
  { id: 'c5N8hRyHYB0', topic: 'Narcissus & Echo' },
  { id: 'pMdJxVjZMRI', topic: 'Pandora\'s box' },
  { id: 'YYZCpJmHAqI', topic: 'Achilles' },
  { id: 'nn8YGPZdCvA', topic: 'King Midas' },
  { id: 'q4pDUxth5fQ', topic: 'Sisyphus' },
  { id: '3s2QPQnuaGk', topic: 'Icarus & Daedalus' },
  { id: 'JwhouCNq-Fc', topic: 'What makes a poem' },
  { id: '9f8VcV8v2LE', topic: 'Slam poet in 5 steps' },
  { id: 'yg16u_bzjPE', topic: 'Trolley problem' },
  { id: 'TfVmW6sNux8', topic: 'Plato\'s ring of Gyges' },

  // Author Masterclasses & Lectures
  { id: 'MEUh_y1IFZY', topic: 'Brandon Sanderson 2025 #1' },
  { id: '0cf-qdZ7GbA', topic: 'Brandon Sanderson 2020 #1' },
  { id: 'jrIogch5DBU', topic: 'Brandon Sanderson 2020 #2 Plot 1' },
  { id: 'Qgbsz7Gnrd8', topic: 'Brandon Sanderson 2020 #3 Plot 2' },
  { id: 'zVXFNw-xz3Y', topic: 'Brandon Sanderson 2020 #4 Viewpoint' },
  { id: 'ATNvOk5rIJA', topic: 'Brandon Sanderson 2020 #5 Worldbuilding 1' },
  { id: 'V2KpWOLTXx8', topic: 'Brandon Sanderson 2020 #6 Worldbuilding 2' },
  { id: 'W1afbpM80b0', topic: 'Brandon Sanderson 2020 #8 Worldbuilding Q&A' },
  { id: '1NCiuI6F5O0', topic: 'Brandon Sanderson 2020 #9 Characters 1' },
  { id: 'fJfE-HMfSkk', topic: 'Brandon Sanderson 2020 #10 Characters 2' },
  { id: '-f0biNdwifI', topic: 'Brandon Sanderson 2020 #12 Publishing 1' },
  { id: 'iSAzw6zOyfo', topic: 'Salman Rushdie 1' },
  { id: 'XEvuTQArdUA', topic: 'Salman Rushdie 2' },
  { id: 'plWexCID-kA', topic: 'Neil Gaiman - Make Good Art' },
  { id: '71m1kE83Irc', topic: 'Unreliable Narrator' }
];

async function verifyAll() {
  const fs = require('fs');
  console.log('Testing candidates:', candidateList.length);
  const verified = [];
  const failed = [];

  for (let i = 0; i < candidateList.length; i += 10) {
    const batch = candidateList.slice(i, i + 10);
    await Promise.all(batch.map(async (item) => {
      try {
        const url = 'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + item.id + '&format=json';
        const res = await fetch(url);
        if (res.ok) {
          const d = await res.json();
          verified.push({
            id: item.id,
            title: d.title,
            channel: d.author_name,
            author_url: d.author_url,
            topic: item.topic
          });
        } else {
          failed.push({ id: item.id, status: res.status, topic: item.topic });
        }
      } catch (err) {
        failed.push({ id: item.id, error: err.message, topic: item.topic });
      }
    }));
  }

  console.log('Verified count:', verified.length);
  console.log('Failed count:', failed.length);
  if (failed.length > 0) {
    console.log('Failed samples:', failed.slice(0, 10));
  }
  fs.writeFileSync('docs/verified_candidate_pool.json', JSON.stringify(verified, null, 2));
}

verifyAll();
