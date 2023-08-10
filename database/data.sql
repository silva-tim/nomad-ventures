-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

 insert into "users"
   ("username", "password")
   values
     ('silvatim', '$argon2id$v=19$m=4096,t=3,p=1$gvXRk/PguiHkbZeJxLacuQ$k6L1634pEdDzlrSLuAf8pyiS7ycWy6ucMoaGJ3Q0xxo');

 insert into "users"
   ("username", "password")
   values
     ('TracyTravels', '$argon2id$v=19$m=4096,t=3,p=1$gvXRk/PguiHkbZeJxLacuQ$k6L1634pEdDzlrSLuAf8pyiS7ycWy6ucMoaGJ3Q0xxo');

 insert into "users"
   ("username", "password")
   values
     ('Callum Bardot', '$argon2id$v=19$m=4096,t=3,p=1$gvXRk/PguiHkbZeJxLacuQ$k6L1634pEdDzlrSLuAf8pyiS7ycWy6ucMoaGJ3Q0xxo');

 insert into "entries"
   ("userId", "title", "subtitle", "location", "body", "photoURL", "photoAlt", "photoAuthor", "photoAuthorLink")
   values
     ('1', 'The Great African Plains', 'Where wilderness is still wild', 'Maasai Mara, Kenya', 'g', 'https://images.unsplash.com/photo-1620693778087-2bced33a4a06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODI3MzJ8MHwxfHNlYXJjaHw0fHxtYWFzYWl8ZW58MHwwfHx8MTY5MTY4ODY1Nnww&ixlib=rb-4.0.3&q=80&w=1080', 'silhouette of deer on grass field during sunset', 'Ahmed Galal', 'https://unsplash.com/@ahmadgalal');

 insert into "entries"
   ("userId", "title", "subtitle", "location", "body", "photoURL", "photoAlt", "photoAuthor", "photoAuthorLink")
   values
    ('2', 'The Largest Desert In the World', 'And not a camel in sight', 'Antarctica', 'g', 'https://images.unsplash.com/photo-1535752385016-16aa049b6a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODI3MzJ8MHwxfHNlYXJjaHwxfHxBbnRhcmN0aWNhfGVufDB8MHx8fDE2OTE2ODg4NjB8MA&ixlib=rb-4.0.3&q=80&w=1080', 'mountain with snow near body of water', 'henrique setim', 'https://unsplash.com/@henriquesetim');

 insert into "entries"
   ("userId", "title", "subtitle", "location", "body", "photoURL", "photoAlt", "photoAuthor", "photoAuthorLink")
   values
    ('1', 'Oil Empire Turned Tourist Hotspot', 'All the crazy things to do in Dubai', 'Dubai, UAE', 'g', 'https://images.unsplash.com/photo-1523816572-a1a23d1a67b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODI3MzJ8MHwxfHNlYXJjaHw1fHxkdWJhaXxlbnwwfDB8fHwxNjkxNjg5NzQ0fDA&ixlib=rb-4.0.3&q=80&w=1080', 'an aerial view of the burj al arab in the middle of the ocean', 'Christoph Schulz', 'https://unsplash.com/@christoph');

 insert into "entries"
   ("userId", "title", "subtitle", "location", "body", "photoURL", "photoAlt", "photoAuthor", "photoAuthorLink")
   values
    ('3', 'The Natural Beauty of Yosemite', 'What I loved the most', 'Yosemite', 'g', 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODI3MzJ8MHwxfHNlYXJjaHw5fHx5b3NlbWl0ZXxlbnwwfDB8fHwxNjkxNjg5OTY4fDA&ixlib=rb-4.0.3&q=80&w=1080', 'snow-covered mountain during a twilight sky', 'Casey Horner', 'https://unsplash.com/@mischievous_penguins');

 insert into "entries"
   ("userId", "title", "subtitle", "location", "body", "photoURL", "photoAlt", "photoAuthor", "photoAuthorLink")
   values
    ('2', 'Florence is the Best City in Italy', '(It''s better than Rome)', 'Florence, Italy', 'g', 'https://images.unsplash.com/photo-1581951756710-084ff9f7b0ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODI3MzJ8MHwxfHNlYXJjaHwxMHx8ZmxvcmVuY2V8ZW58MHwwfHx8MTY5MTY5MDEzOXww&ixlib=rb-4.0.3&q=80&w=1080', 'aerial view of city buildings during daytime', 'Ahmed Mansour', 'https://unsplash.com/@ahmedmansour_25');
