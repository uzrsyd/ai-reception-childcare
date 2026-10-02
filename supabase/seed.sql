insert into centers (id, name) values ('center-001', 'BrightPath Early Learning Center')
on conflict do nothing;

insert into policies (id, center_id, category, title, content, active, created_at, updated_at) values
  ('pol-001', 'center-001', 'Hours', 'Hours of Operation', 'BrightPath Early Learning Center is open Monday through Friday from 7:00 AM to 6:00 PM. Parents should plan to pick up children by 6:00 PM. The center follows its published annual holiday calendar and may close for recognized holidays.', true, now(), now()),
  ('pol-002', 'center-001', 'Pickup', 'Late Pickup', 'Pickup after 6:00 PM incurs a $15 fee for each 10-minute interval after closing time. Late pickup charges are intended to cover staffing and operational costs. Families should contact the center as soon as possible if they will be late.', true, now(), now()),
  ('pol-003', 'center-001', 'Tuition', 'Tuition and Fees', 'Tuition varies by age group, classroom, and program. BrightPath does not publish a single flat rate online. Families should contact the center for current tuition and fee information for the appropriate classroom or program.', true, now(), now()),
  ('pol-004', 'center-001', 'Illness', 'Illness & Wellness Policy', 'A child must stay home if they have a fever of 100.4°F or higher, vomiting, diarrhea, or a contagious illness. A child may return after being symptom-free for 24 hours without fever-reducing medication, unless otherwise directed by a healthcare professional. Staff may require additional documentation or guidance depending on the health concern.', true, now(), now()),
  ('pol-005', 'center-001', 'Medication', 'Medication Administration', 'Medication must be delivered in the original labeled container and accompanied by parent authorization. Medication is administered according to center procedures and staff guidance. The center does not provide medical diagnoses or individualized medical recommendations.', true, now(), now()),
  ('pol-006', 'center-001', 'Meals', 'Meals and Snacks', 'BrightPath provides a morning snack, lunch, and an afternoon snack each day. The center follows a menu that supports healthy eating and considers dietary needs. Families should notify staff of allergies or dietary restrictions so the center can coordinate safe meal planning.', true, now(), now()),
  ('pol-007', 'center-001', 'Meals', 'Allergy and Dietary Support', 'Families must inform BrightPath of any known allergies, dietary restrictions, or medical nutrition needs before enrollment or when the need arises. Staff will work with families to support a safe plan, but the center does not manage medical diagnosis or treatment plans outside of the center''s policy and procedures.', true, now(), now()),
  ('pol-008', 'center-001', 'Tours', 'Center Tours', 'Tours are offered Monday through Friday. Parents may request a tour by contacting the center or completing a tour request through the main office. Tour availability depends on staff scheduling and classroom activity.', true, now(), now()),
  ('pol-009', 'center-001', 'Enrollment', 'Enrollment and Classroom Availability', 'Enrollment is based on classroom availability, age fit, and center capacity. Families may inquire about openings, waitlists, and start dates by contacting the center. A classroom placement is not guaranteed until the center confirms enrollment.', true, now(), now()),
  ('pol-010', 'center-001', 'Pickup', 'Authorized Pickup Policy', 'Only authorized individuals may pick up a child from BrightPath. Parents should keep pickup authorization current. Photo identification may be requested before releasing a child to an authorized pickup person.', true, now(), now()),
  ('pol-011', 'center-001', 'Closures', 'Weather and Holiday Closures', 'BrightPath follows the published annual holiday calendar for scheduled closures. Weather-related closures are communicated directly to families by the center. Families should check direct center communication for closure updates.', true, now(), now()),
  ('pol-012', 'center-001', 'General', 'Parent Communication', 'Parents should contact center staff for account-specific questions, enrollment questions, account updates, tuition, and questions that require a staff decision. The AI Front Desk is designed to answer general questions using current center policies and may direct families to staff when the answer is not clear.', true, now(), now()),
  ('pol-013', 'center-001', 'General', 'Safety and Escalation', 'The AI Front Desk cannot provide emergency medical guidance, diagnose illness, or provide individualized safety advice. For emergencies, families should contact emergency services immediately and notify center staff as appropriate. Sensitive family or medical questions should be reviewed by staff.', true, now(), now()),
  ('pol-014', 'center-001', 'General', 'Center Contact', 'Families may contact the BrightPath main office to confirm center hours, tuition, enrollment, pickup authorization, closures, and other center-specific policies. Staff are the best source for account-specific or situation-specific guidance.', true, now(), now())
on conflict (id) do nothing;

insert into interactions (id, center_id, question, answer, status, confidence, operator_note, category, created_at) values
  ('int-001', 'center-001', 'What time do you close?', 'BrightPath is open Monday through Friday from 7:00 AM to 6:00 PM. The center closes at 6:00 PM.', 'answered', 'high', 'Direct answer from Hours policy.', 'Hours', now() - interval '2 days'),
  ('int-002', 'center-001', 'My daughter had a fever this morning. Can she come tomorrow?', 'Children may return after being symptom-free for 24 hours without fever-reducing medication, unless a healthcare professional directs otherwise.', 'answered', 'high', 'Illness policy covers the symptom-free return period.', 'Illness', now() - interval '1 day'),
  ('int-003', 'center-001', 'Do you offer sibling discounts?', 'I could not find a reliable answer to that in BrightPath''s current policies. Please contact the center so staff can confirm.', 'escalated', 'low', 'No sibling discount policy exists. Operator action: add policy.', 'Tuition', now() - interval '1 day 2 hours'),
  ('int-004', 'center-001', 'Are meals included?', 'BrightPath provides a morning snack, lunch, and an afternoon snack each day.', 'answered', 'high', 'Meals policy directly answers the question.', 'Meals', now() - interval '20 hours'),
  ('int-005', 'center-001', 'My child has a rash. What disease does she have?', 'I can''t diagnose medical conditions or tell you what illness a child may have. Please contact a healthcare professional and the center for guidance.', 'escalated', 'low', 'Medical diagnosis request should not be answered by AI.', 'General', now() - interval '14 hours'),
  ('int-006', 'center-001', 'My child is having trouble breathing. What should I do?', 'This is an emergency. Please call emergency services immediately and seek urgent medical care right away.', 'escalated', 'low', 'Emergency response should not rely on policy summary.', 'General', now() - interval '11 hours'),
  ('int-007', 'center-001', 'Who can pick up my child?', 'Only authorized individuals may pick up a child. Photo identification may be requested before release.', 'answered', 'high', 'Pickup policy covers authorized pickup rules.', 'Pickup', now() - interval '8 hours'),
  ('int-008', 'center-001', 'Are you open on Fridays?', 'BrightPath is open Monday through Friday from 7:00 AM to 6:00 PM.', 'answered', 'high', 'Hours policy covers opening days and times.', 'Hours', now() - interval '5 hours'),
  ('int-009', 'center-001', 'Can I get a tour this week?', 'Tours are offered Monday through Friday, and parents may request a tour by contacting the center.', 'answered', 'medium', 'Tour policy exists but final scheduling depends on staff availability.', 'Tours', now() - interval '2 hours'),
  ('int-010', 'center-001', 'What is the tuition for the infant room?', 'Tuition varies by age group, classroom, and program. Please contact the center for current pricing for the appropriate room or program.', 'answered', 'high', 'Tuition policy explains price variability by classroom.', 'Tuition', now() - interval '1 hour')
on conflict (id) do nothing;

insert into interaction_sources (interaction_id, policy_id)
select id, 'pol-001' from interactions where question = 'What time do you close?'
union all select id, 'pol-004' from interactions where question = 'My daughter had a fever this morning. Can she come tomorrow?'
union all select id, 'pol-003' from interactions where question = 'Do you offer sibling discounts?'
union all select id, 'pol-006' from interactions where question = 'Are meals included?'
union all select id, 'pol-013' from interactions where question = 'My child has a rash. What disease does she have?'
union all select id, 'pol-013' from interactions where question = 'My child is having trouble breathing. What should I do?'
union all select id, 'pol-010' from interactions where question = 'Who can pick up my child?'
union all select id, 'pol-001' from interactions where question = 'Are you open on Fridays?'
union all select id, 'pol-008' from interactions where question = 'Can I get a tour this week?'
union all select id, 'pol-003' from interactions where question = 'What is the tuition for the infant room?';

insert into feedback (interaction_id, rating, comment, created_at) values
  ('int-001', 5, 'Helpful and direct.', now() - interval '2 days'),
  ('int-002', 5, 'Answer was clear and policy-based.', now() - interval '1 day'),
  ('int-003', 1, 'I wanted an answer and the AI should have escalated earlier.', now() - interval '1 day 2 hours'),
  ('int-004', 4, 'Nice answer and concise.', now() - interval '20 hours'),
  ('int-005', 1, 'This was a sensitive medical question and should not have been answered by AI.', now() - interval '14 hours'),
  ('int-006', 5, 'Good emergency escalation.', now() - interval '11 hours'),
  ('int-007', 4, 'Helpful and clearly grounded.', now() - interval '8 hours'),
  ('int-008', 5, 'Direct answer.', now() - interval '5 hours'),
  ('int-009', 4, 'Helpful but needed a staff follow-up.', now() - interval '2 hours'),
  ('int-010', 5, 'Accurate and clear.', now() - interval '1 hour');
