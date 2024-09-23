CREATE TABLE `charges` (
  `structure_id` int NOT NULL,
  `student_id` int UNSIGNED NOT NULL
);

CREATE TABLE `deposits` (
  `id` int NOT NULL,
  `student_id` int UNSIGNED NOT NULL,
  `amount` int NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `statuses` (
  `student_id` int UNSIGNED NOT NULL,
  `status` int NOT NULL
);

CREATE TABLE `structures` (
  `id` int NOT NULL,
  `title` varchar(64) NOT NULL,
  `amount` int UNSIGNED NOT NULL,
  `grades` varchar(64) NOT NULL
);

CREATE TABLE `students` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(256) NOT NULL,
  `grade_id` int UNSIGNED NOT NULL
);

ALTER TABLE `charges`
  ADD PRIMARY KEY (`structure_id`,`student_id`),
  ADD KEY `charges_student_id` (`student_id`),
  ADD KEY `charges_structure_id` (`structure_id`);

ALTER TABLE `deposits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deposit_student_id` (`student_id`);

ALTER TABLE `statuses`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `statuses_student_id` (`student_id`);

ALTER TABLE `structures`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `deposits`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `structures`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `charges`
  ADD CONSTRAINT `charges_structure_id` FOREIGN KEY (`structure_id`) REFERENCES `structures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `charges_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `deposits`
  ADD CONSTRAINT `STUDENT_ID_FK` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `statuses`
  ADD CONSTRAINT `statuses_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
