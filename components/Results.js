import React from 'react'
import Card from './Card'

const Results = ({ results }) => {
  if (results?.length > 0) {
    return (
      <div className="bg-gray-700 select-none p-2  sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((result) => {
          return <Card key={result.id} result={result} />
        })}
      </div>
    )
  }

  return (
    <div className="bg-gray-700 select-none sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <h1>Loading...</h1>
    </div>
  )
}

export default Results
