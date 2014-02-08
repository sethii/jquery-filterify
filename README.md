jquery-filterify
================

jQuery.filterify - make your tables interactive
Filterify is a jquery extension which add a select box to each of table head td/th element, making it filterable by user.
		<h2>Usage</h2>	
		Filterify is extremaly easy to use! Just run <code>$.filterify()</code> on any table element or even on group of elements you wish to!
		<h3>Example 1</h3>
		<code>
			$('.filterify').filterify();
		</code>
		<h2>
		Parameters
		</h2>
		<h3>Columns</h3>
		<p>Columns parameter allows you to specify which columns should be filterable. Columns are counted from 1 to N.</p>
		<h4>Example 4</h4>
		<code>
			$('.filterify-2').filterify({
				'columns': '1,3,5'
			});
		</code>
		<p>To make it more usefull columns parameter comes with predefined values:</p>
		<h3>Except-first</h3>
		<p>If you pass <code>except-first</code>, all columns except first will be filterable</p>
		<h4>Example 3</h4>
		<code>
			$('.filterify-3').filterify({
				'columns': 'except-first'
			});
		</code>
		<h3>Except-last</h3>
		<p>If you pass <code>except-last</code>, all columns but last will be filterable</p>
		<h4>Example 4</h4>
		<code>
			$('.filterify-4').filterify({
				'columns': 'except-last'
			});
		</code>
		<h3>Except-first-and-last</h3>
		<p>If you pass <code>except-first-and-last</code>, all columns except first and last will be filterable</p>
		<h4>Example 5</h4>
		<code>
			$('.filterify-5').filterify({
				'columns': 'except-first-and-last'
			});
		</code>
		<h3>Between-n-m</h3>
		<p>If you pass <code>between-n-m</code>, all columns between N and M will be filterable</p>
		<h4>Example 6</h4>
		<code>
			$('.filterify-6').filterify({
				'columns': 'between-2-4'
			});
		</code>
		<h3>All (default value)</h3>
		<p>If you pass <code>all</code>, all columns will be filterable</p>
		<h4>Example 7</h4>
		<code>
			$('.filterify-7').filterify({
				'columns': 'all'
			});
		</code>
		<h3>emptyValue</h3>
		<p>emptyValue parameter allows you to spcify default select tag value</p>
		<h4>Example 8</h4>
		<code>
			$('.filterify-8').filterify({
				'emptyValue': 'This is default value'
			});
		</code>
	 <p>For more information check examples.</p>
