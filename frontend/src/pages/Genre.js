import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const GENRE = gql `
  query GetGenre($id: ID!) {
      genre(id: $id) {
          name,
          id,
          reviews {
            title,
            body,
            rating, 
            id,
            genres {
              name,
              id
            }
          }
      }
  }
`

export default function Genre() {
  const { id } = useParams()
  //const {data, error, loading} = useFetch('http://localhost:1337/reviews/'+id)
  const { loading, error, data } = useQuery(GENRE, {
    variables: { id: id }
  })

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error :/</p>

  console.log(data)
 
  return (
    <div>
      <h2>{data.genre.name}</h2>

      {data.genre.reviews.length === 0 ? (
        <p>We don't have any books in this genre</p>
      ) 
      :
      (data.genre.reviews.map(review => (
        <div key={review.id} className='review-card'>
          <div className='rating'>{review.rating}</div>
          <h2>{review.title}</h2>
          <small>console list</small>
          <p>{review.body.substring(0,200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
        ))
      )}
    </div>
  )
}
