import './App.css'

function App() {

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src='https://www.collectivegoods.com/wp-content/uploads/CG-logo.png' alt="Collective Goods logo" />
        </a>
      </div>
      <h1>Hello Adam</h1>
      <p>Here's a CI/CD pipeline with staging and production environments.</p>
      <p>When a pull request into the `main` github branch is closed, the `staging` environment is built and deployed.</p>
      <p>After testing in stage, a new PR deploys a release to production by opening a PR from `main` into the `prodution`. This triggers the `production` environment to build and deployed.</p>
    </>
  )
}

export default App
