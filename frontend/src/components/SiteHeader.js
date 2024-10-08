import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const GENRES = gql `
    query GetGenres {
        genres {
            name,
            id
        }
    }
`

export default function SiteHeader() {
    const { loading, error, data} = useQuery(GENRES)

    if(loading) return <p>Loading genres...</p>
    if(error) return <p>Error fetching genres</p>

    console.log(data)

    return (
        <div className="site-header">
            <Link to="/"><h1>Coś </h1></Link>
            <nav className="genres">
            <span>Filter reviews by genres:</span>
            {data.genres.map(genre => (
                <Link key={genre.id} to={`/genre/${genre.id}`}>
                    {genre.name}
                </Link>
            ))}
            </nav>
        </div>
    )
}