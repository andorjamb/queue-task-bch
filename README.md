# Queue Data Structure Task

A simple Queue data structure app, built with React.

Screenshot:
![screenshot](https://github.com/andorjamb/DatabasesDataStructures/blob/master/queue_task/screenshot_queue.png)

#### Enqueue Psuedocode:
    This function accepts some value
    Create a new node using that value passed to the function
    If there are no nodes in the queue, set this node to be the first and last property of the queue
  
    Otherwise, set the 'next' property on the current queue 'last' to be that node, and then set the 'last' property of the queue to be that node.
    Increment the size of the queue by 1 


#### DeQueue Pseudocode:
  Removing from the beginning of the Queue!
  If there is no 'first' property, just return null
  Store the 'first' property in a variable
  See if the first is the same as the last (check if there is only 1 node). 
  If so, set the first and last to be null

  If there is more than 1 node, set the queue 'first' property to be the 'next' property of first node
  Decrement the queue size by 1
  Return the value of the node dequeued 
