-- Año en que naciste
SELECT *
FROM movies
WHERE year = 2001;

--Cuantas películas hay en la DB 
--que sean del año 1982?
SELECT COUNT(*) AS count_movies
FROM movies
WHERE year = 1982;

--Actores que tengan en el substring
-- stack en su apellido
SELECT * 
FROM actors 
WHERE last_name LIKE '%stack%';

--los 10 nombres y apellidos más populares
SELECT first_name, last_name, COUNT(*) AS total
FROM actors
GROUP BY lower(first_name), lower(last_name)
ORDER BY total DESC
LIMIT 10;

--lista el top 100 de actores más activos
--Junto con el número de roles que haya realizado
SELECT a.first_name, a.last_name, COUNT(*) AS total_roles
FROM actors AS a
JOIN roles AS r ON a.id = r.actor_id
GROUP BY a.id
ORDER BY total_roles DESC
LIMIT 100;


--6 Bottom of the Barrel
SELECT genre, COUNT(*) AS total
FROM movies_genres
GROUP BY genre 
ORDER BY total;

--7. Braveheart de 1995
--nombre y apellido de actores
--alfabéticamente por apellidos
SELECT a.first_name, a.last_name 
FROM actors as a 
JOIN roles as r ON a.id = r.actor_id
JOIN movies as m ON r.movie_id = m.id
WHERE m.name = 'Braveheart' AND m.year = 1995
ORDER BY a.last_name;

--8 Leap Noir, directores que dirigieron
--una movie el genero Film-noir, en un año
--bisiesto; nombre director|nombre peli|year
--ordenado por el nombre de la peli
SELECT d.first_name, d.last_name,  m.name, m.year 
FROM directors AS d

JOIN movies_directors AS md ON md.director_id = d.id 
JOIN movies AS m ON m.id = md.movie_id 
JOIN movies_genres AS mg ON m.id=mg.movie_id
WHERE mg.genre = 'Film Noir'
AND m.year % 4 = 0
ORDER BY d.last_name;

-----------------------------
-- 9 Actores que actuaron junto Kevi bacon
SELECT a.first_name, a.last_name FROM actors AS a 
JOIN roles AS r ON a.id = r.actor_id
JOIN movies AS m ON r.movie_id = m.id
JOIN movies_genres AS mg ON m.id = mg.movie_idWHERE mg.genre = 'DRAMA' AND m.id IN (
WHERE mg.genre = 'Drama' AND m.id IN (
    FROM roles AS r 
    JOIN actors AS a ON r.actor_id = a.id 
    WHERE a.first_name = 'Kevin' AND a.last_name = 'Bacon'
)
AND (a.first_name || ' ' || a.last_name != 'Kevin Bacon');

--10 
SELECT * FROM actors 
WHERE id IN (
    SELECT r.actor_id 
    FROM roles AS r 
    JOIN movies AS m ON r.movie_id = m.id 
    WHERE m.year < 1900  
) AND
id IN (
    SELECT r.actor_id 
    FROM roles AS r 
    JOIN movies AS m ON r.movie_id = m.id 
    WHERE m.year > 2000
);

--11
SELECT first_name, last_name, COUNT(DISTINCT(role)) AS total
FROM roles AS r 
JOIN actors AS a ON a.id = r.actors_id 
JOIN movies AS m ON r.movie_id = m.id 
WHERE m.year > 1990 
GROUP BY actor_id, movie_id 
HAVING total > 4;

--12 
contar peliculas de años solo con actrices 
SELECT year, COUNT(*) AS total 
FROM movies 
WHERE id NOT IN(
    SELECT movie_id 
    FROM roles AS r 
    JOIN actors AS a 
    ON r.actor_id = a.id 
    WHERE a.gender = 'M'
)
GROUP BY year; 
