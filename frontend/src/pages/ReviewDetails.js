import React from 'react'
import { useParams } from 'react-router-dom'
//import useFetch from '../hooks/userFetch'
import { useQuery, gql } from '@apollo/client'

const REVIEW = gql `
  query GetReview ($id: ID!) {
    review(id: $id) {
      title,
      body,
      rating,
      id
    }
  }
`

export default function ReviewDetails() {
  const { id } = useParams()
  //const {data, error, loading} = useFetch('http://localhost:1337/reviews/'+id)
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id }
  })

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error :/</p>

  console.log()

  return (
    <div key={data.id} className='review-card'>
      <div className='rating'>{data.review.rating}</div>
      <h2>{data.review.title}</h2>

      <small>console list</small>

      <p>{data.review.body}</p>
    </div>
  )
}
