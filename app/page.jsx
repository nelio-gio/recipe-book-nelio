'use client'

import { useState } from 'react'
import recipes from '../data/recipes.json'
import styles from './page.module.css'
import RecipeList from '../components/RecipeList/RecipeList'

export default function HomePage() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes)
  const [searchTerm, setSearchTerm] = useState('')

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse())
  }

  const filteredRecipes = orderedRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Recipe Book</h1>
          <button
            type="button"
            className={styles.toggle}
            onClick={handleToggleOrder}
          >
            Reverse order
          </button>
        </div>

        <div style={{
          padding: '0 20px 20px',
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}>
          <input
            type="text"
            placeholder="Rechercher un plat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '420px',
              padding: '13px 20px',
              fontSize: '1rem',
              border: '2px solid #ccc',
              borderRadius: '20px',
              outline: 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          />
        </div>
      </header>

      <main className={styles.main}>
        {filteredRecipes.length === 0 ? (
          <p style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#666',
            fontSize: '1.1rem'
          }}>
            Aucun plat correspondant à votre recherche.
          </p>
        ) : (
          <RecipeList recipes={filteredRecipes} />
        )}
      </main>
    </div>
  )
}