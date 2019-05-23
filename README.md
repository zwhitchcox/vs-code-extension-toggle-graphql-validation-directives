# How it works

So, you can make validation directive like this

```graphql
type User {
  id: ID! @id
  firstName
  @validation(
    min: 3
    max: 100
  )
}
```

, but this can get a little cluttered in your view. This plugin registers each validation directive as a region, and then lets you collapse it with `Ctrl + Shift + P` > `Fold All Regions`. Then, unfold with `Ctrl + Shift + P` > `Unfold All Regions`.

First though (for now) you have to run the command `Toggle Graphql Validation Directives`. That will mark all the regions. Again, you can get to the command palette with `Ctrl + Shift + P`.

Hopefully when I'm done, it will just automatically mark all the regions when you open a graphql file, but not sure.