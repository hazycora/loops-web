<h1>hazel's loops</h1>

<form method="post">
	<label>
		Email
		<input type="text" name="email" placeholder="jane@example.com" />
	</label>
	<label>
		Password
		<input type="password" name="password" placeholder="****" />
	</label>
	<input type="submit" value="Log in" />
</form>

<footer>
	<a href="https://git.gay/h/loops-web">source code</a>
</footer>

<style lang="postcss">
	form {
		display: grid;
		height: min-content;
		gap: 0.5rem;
		width: 20rem;
		max-width: 100%;
		margin-inline: auto;
		padding-block: 2rem;

		> label {
			display: grid;
			grid-template-columns: 8rem 1fr;
		}
	}

	footer {
		margin-block-start: 1rem;
		border-block-start: 1px solid rgb(255 255 255 / 0.2);
	}
</style>
