-- Execute read-only against project iwcbuvutqhwxgovkecfa after applying seed.
SELECT c.slug,c.status,c.title,
  (SELECT count(*) FROM public.course_modules cm WHERE cm.course_id=c.id) AS modules,
  (SELECT count(*) FROM public.lessons l WHERE l.course_id=c.id) AS lessons,
  (SELECT count(DISTINCT l.youtube_video_id) FROM public.lessons l WHERE l.course_id=c.id) AS distinct_video_ids,
  (SELECT count(*) FROM public.lessons l WHERE l.course_id=c.id AND l.youtube_video_id !~ '^[A-Za-z0-9_-]{11}$') AS invalid_video_ids
FROM public.courses c
WHERE c.id='e1000000-0000-4000-8000-000000000001';

SELECT cm.order_index,count(l.id) AS lessons_in_module
FROM public.course_modules cm
LEFT JOIN public.lessons l ON l.module_id=cm.id AND l.course_id=cm.course_id
WHERE cm.course_id='e1000000-0000-4000-8000-000000000001'
GROUP BY cm.id,cm.order_index ORDER BY cm.order_index;
