import { useState, useEffect } from "react";
import "./App.css";

const genre = ["Action", "Drama", "Sci-Fi", "Horror", "Comedy", "Romance"];

function App() {
	const [displayAddMovie, setDisplayAddMovie] = useState(false);
	const [movie, setMovie] = useState({
		title: "",
		image: "",
		rating: "3",
		genre: genre[0],
		description: "",
	});

	const [movies, setMovies] = useState([]);

	function handleSubmit(e) {
		e.preventDefault();
		setMovies([...movies, movie]);
		setDisplayAddMovie(!displayAddMovie);
		resetMovieState();
	}

	function handleDelete(index) {
		// Create a new array with movies except the one to be deleted
		const updatedMovies = movies.filter((_, i) => i !== index);
		// Set the state with the updated array
		setMovies(updatedMovies);
	}

	function resetMovieState() {
		setMovie({
			title: "",
			image: "",
			rating: "3",
			genre: genre[0],
			description: "",
		});
	}

	// Log the movies state whenever it changes
	useEffect(() => {
		console.log(movies);
	}, [movies]);

	return (
		<>
			<div id="btnadd" onClick={() => setDisplayAddMovie(!displayAddMovie)}>
				+
			</div>
			<div id="addmovie" style={{ display: displayAddMovie ? "block" : "none" }}>
				<form>
					<input
						placeholder="Title"
						type="text"
						onChange={(e) => setMovie({ ...movie, title: e.target.value })}
						value={movie.title}
					/>
					<input
						placeholder="Cover Image Source"
						type="text"
						onChange={(e) => setMovie({ ...movie, image: e.target.value })}
						value={movie.image}
					/>
					<p>Rating (1-5)</p>
					<input
						type="range"
						min={"1"}
						max={"5"}
						step={"1"}
						value={movie.rating}
						onChange={(e) => {
							setMovie({ ...movie, rating: e.target.value });
						}}
					/>
					<select
						name="genre"
						id="genre"
						onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
					>
						{genre.map((gen) => (
							<option value={gen}>{gen}</option>
						))}
					</select>
					<textarea
						placeholder="Description"
						type="text"
						onChange={(e) => setMovie({ ...movie, description: e.target.value })}
						value={movie.description}
					/>

					<button type="submit" onClick={(e) => handleSubmit(e)}>
						Save
					</button>
				</form>
			</div>
			<div id="list">
				{movies.length > 0 &&
					movies.map((movie, index) => (
						<div className="movie" key={index} data-id={index}>
							<div className="image">
								<div
									class="delete"
									onClick={(e) => {
										handleDelete(index);
									}}
								>
									x
								</div>
								<span class="rating">{movie.rating}</span>
								<img src={movie.image} alt="" />
							</div>
							<h2>{movie.title}</h2>
							<p class="genre">{movie.genre}</p>
							<p class="description">{movie.description}</p>
						</div>
					))}
			</div>
		</>
	);
}

export default App;
