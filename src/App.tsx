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
      <div className="content">
        Here's a CI/CD pipeline with staging and production environments. <a href="https://github.com/lswarner/collective-goods-cicd-demo/blob/main/README.md">Learn More</a>.
  
        <p>
          When a pull request into the main github branch is closed, the staging environment is built and deployed.
        </p>
        <p>
          After testing in stage, you can deploy a release to production by opening a PR from main into the production branch. This triggers the production environment to build and deploy.
       </p>
       </div>
    </>
  )
}

export default App
