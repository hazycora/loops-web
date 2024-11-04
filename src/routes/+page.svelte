<div class="page">
	<form method="post">
		<p>An unofficial client for <a href="https://loops.videos">Loops</a></p>
		<label>
			Email
			<input type="text" name="email" placeholder="jane@example.com" />
		</label>
		<label>
			Password
			<input type="password" name="password" placeholder="****" />
		</label>
		<input type="submit" value="Log in" />
		<p>
			<a href="https://git.gay/h/loops-web">source code</a>
		</p>
	</form>
</div>

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
</style>
