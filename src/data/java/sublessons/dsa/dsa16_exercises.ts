import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 16: STACKS, QUEUES & LISTS (40 EXERCISES)
// 10 Exercises per sub-lesson across Lessons 16.1 - 16.4
// ============================================================

export const dsa16Exercises: Record<string, ProgrammingExercise[]> = {
  // ── LESSON 16.1: Stack Architecture & ArrayDeque Implementation ────────
  'stack-adt-and-arraydeque': [
    {
      id: 'dsa-16-1-ex1',
      title: 'Array-Based Stack Implementation',
      problemStatement: 'Implement a fixed-capacity stack `ArrayStack` with `push`, `pop`, `peek`, `isEmpty`, and `size` methods. Demonstrate pushing 3 items, peeking, and popping.',
      hint: 'Maintain an array and an integer top pointer initialized to -1.',
      solutionCode: `public class Main {
    static class ArrayStack {
        private int[] data;
        private int top;

        public ArrayStack(int capacity) {
            data = new int[capacity];
            top = -1;
        }

        public void push(int val) {
            if (top == data.length - 1) throw new RuntimeException("Stack Overflow");
            data[++top] = val;
        }

        public int pop() {
            if (isEmpty()) throw new RuntimeException("Stack Underflow");
            return data[top--];
        }

        public int peek() {
            if (isEmpty()) throw new RuntimeException("Stack Empty");
            return data[top];
        }

        public boolean isEmpty() { return top == -1; }
        public int size() { return top + 1; }
    }

    public static void main(String[] args) {
        ArrayStack stack = new ArrayStack(5);
        stack.push(10);
        stack.push(20);
        stack.push(30);

        System.out.println("Top: " + stack.peek());
        System.out.println("Popped: " + stack.pop());
        System.out.println("Size: " + stack.size());
    }
}`,
      output: `Top: 30
Popped: 30
Size: 2`,
      explanation: 'All stack operations (`push`, `pop`, `peek`) execute in $O(1)$ constant time with $O(N)$ capacity space allocation. The `top` pointer eliminates shifting.'
    },
    {
      id: 'dsa-16-1-ex2',
      title: 'Balanced Parentheses and Brackets Validator',
      problemStatement: 'Write a method `isValid(String s)` using `ArrayDeque<Character>` to determine if brackets `()`, `{}`, `[]` are valid and properly closed.',
      hint: 'Push opening brackets onto stack. For closing brackets, check if stack is empty or top does not match corresponding opening bracket.',
      solutionCode: `import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else {
                if (stack.isEmpty() || stack.pop() != c) return false;
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println("([{}]) valid? " + isValid("([{}])"));
        System.out.println("([)] valid? " + isValid("([)]"));
    }
}`,
      output: `([{}]) valid? true
([)] valid? false`,
      explanation: 'Pushing the expected closing bracket when seeing an opener simplifies matching: on encountering a closer, `stack.pop() != c` detects mismatches in $O(N)$ time and $O(N)$ space.'
    },
    {
      id: 'dsa-16-1-ex3',
      title: 'Min Stack with $O(1)$ getMin()',
      problemStatement: 'Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element `getMin()` all in $O(1)$ constant time.',
      hint: 'Maintain two stacks: a primary data stack and a minStack that records the minimum value up to the current height.',
      solutionCode: `import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    static class MinStack {
        private Deque<Integer> stack = new ArrayDeque<>();
        private Deque<Integer> minStack = new ArrayDeque<>();

        public void push(int val) {
            stack.push(val);
            if (minStack.isEmpty() || val <= minStack.peek()) {
                minStack.push(val);
            }
        }

        public void pop() {
            int popped = stack.pop();
            if (popped == minStack.peek()) {
                minStack.pop();
            }
        }

        public int top() { return stack.peek(); }
        public int getMin() { return minStack.peek(); }
    }

    public static void main(String[] args) {
        MinStack ms = new MinStack();
        ms.push(-2);
        ms.push(0);
        ms.push(-3);
        System.out.println("Min: " + ms.getMin()); // -3
        ms.pop();
        System.out.println("Top: " + ms.top());   // 0
        System.out.println("Min: " + ms.getMin()); // -2
    }
}`,
      output: `Min: -3
Top: 0
Min: -2`,
      explanation: 'The auxiliary `minStack` maintains the running minimum. Each operation executes in strictly $O(1)$ time and $O(N)$ auxiliary space.'
    },
    {
      id: 'dsa-16-1-ex4',
      title: 'Evaluate Reverse Polish Notation (Postfix)',
      problemStatement: 'Evaluate an arithmetic expression in Reverse Polish Notation (RPN) using an `ArrayDeque` stack. Test with `["2", "1", "+", "3", "*"]`.',
      hint: 'Push operands onto stack. For operators (+, -, *, /), pop two operands, apply operation, and push result back.',
      solutionCode: `import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static int evalRPN(String[] tokens) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (String t : tokens) {
            if (t.equals("+")) stack.push(stack.pop() + stack.pop());
            else if (t.equals("-")) {
                int b = stack.pop(), a = stack.pop();
                stack.push(a - b);
            } else if (t.equals("*")) stack.push(stack.pop() * stack.pop());
            else if (t.equals("/")) {
                int b = stack.pop(), a = stack.pop();
                stack.push(a / b);
            } else {
                stack.push(Integer.parseInt(t));
            }
        }
        return stack.pop();
    }

    public static void main(String[] args) {
        String[] expr = { "2", "1", "+", "3", "*" }; // (2 + 1) * 3 = 9
        System.out.println("RPN Result: " + evalRPN(expr));
    }
}`,
      output: 'RPN Result: 9',
      explanation: 'Postfix notation eliminates parenthesis ambiguities. Evaluating $N$ tokens takes $O(N)$ time and $O(N)$ stack space.'
    },
    {
      id: 'dsa-16-1-ex5',
      title: 'Next Greater Element using Monotonic Stack',
      problemStatement: 'Given an array, find the next greater element for each item. If no greater element exists to the right, output -1. Achieve $O(N)$ time.',
      hint: 'Iterate from right to left, maintaining a monotonic stack of elements in descending order. Pop elements smaller than current.',
      solutionCode: `import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class Main {
    public static int[] nextGreaterElement(int[] arr) {
        int n = arr.length;
        int[] result = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= arr[i]) {
                stack.pop();
            }
            result[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(arr[i]);
        }
        return result;
    }

    public static void main(String[] args) {
        int[] nums = { 4, 5, 2, 25 };
        System.out.println("Next Greater: " + Arrays.toString(nextGreaterElement(nums)));
    }
}`,
      output: 'Next Greater: [5, 25, 25, -1]',
      explanation: 'Each element is pushed and popped from the monotonic stack at most once. Total time is $O(N)$, outperforming the $O(N^2)$ brute-force double loop.'
    },
    {
      id: 'dsa-16-1-ex6',
      title: 'Daily Temperatures (Days to Warmer Weather)',
      problemStatement: 'Given an array of daily temperatures `[73, 74, 75, 71, 69, 72, 76, 73]`, return an array where `res[i]` is the number of days you must wait for a warmer temperature.',
      hint: 'Use a monotonic decreasing stack storing indices. When current temp > temp at stack top index, pop and calculate day difference.',
      solutionCode: `import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class Main {
    public static int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        Deque<Integer> stack = new ArrayDeque<>(); // stores indices

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevDay = stack.pop();
                answer[prevDay] = i - prevDay;
            }
            stack.push(i);
        }
        return answer;
    }

    public static void main(String[] args) {
        int[] temps = { 73, 74, 75, 71, 69, 72, 76, 73 };
        System.out.println("Wait days: " + Arrays.toString(dailyTemperatures(temps)));
    }
}`,
      output: 'Wait days: [1, 1, 4, 2, 1, 1, 0, 0]',
      explanation: 'Indices are pushed once and popped once, giving $O(N)$ linear time. For example, index 2 (temp 75) waits until day 6 (temp 76), recording $6 - 2 = 4$ days.'
    },
    {
      id: 'dsa-16-1-ex7',
      title: 'Decode String with Nested Multipliers',
      problemStatement: 'Decode an encoded string like `"3[a2[c]]"` into `"accaccacc"` using two stacks (one for counts, one for string buffers).',
      hint: 'Maintain countStack and strStack. On \'[\', push current count and current string. On \']\', pop count and repeat current string.',
      solutionCode: `import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static String decodeString(String s) {
        Deque<Integer> countStack = new ArrayDeque<>();
        Deque<StringBuilder> strStack = new ArrayDeque<>();
        StringBuilder cur = new StringBuilder();
        int k = 0;

        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                k = k * 10 + (c - '0');
            } else if (c == '[') {
                countStack.push(k);
                strStack.push(cur);
                cur = new StringBuilder();
                k = 0;
            } else if (c == ']') {
                StringBuilder decoded = strStack.pop();
                int repeat = countStack.pop();
                for (int i = 0; i < repeat; i++) decoded.append(cur);
                cur = decoded;
            } else {
                cur.append(c);
            }
        }
        return cur.toString();
    }

    public static void main(String[] args) {
        System.out.println("Decoded: " + decodeString("3[a2[c]]"));
    }
}`,
      output: 'Decoded: accaccacc',
      explanation: 'Stack-based nesting handles arbitrary depth. Inner "2[c]" decodes to "cc", appended to "a" ("acc"), and multiplied by 3 to produce "accaccacc".'
    },
    {
      id: 'dsa-16-1-ex8',
      title: 'Asteroid Collision Simulation',
      problemStatement: 'Simulate asteroid collisions where positive moves right and negative moves left. When two meet, smaller explodes; equal sizes both explode. Test with `[5, 10, -5]`.',
      hint: 'Use a stack. A collision only occurs when stack top > 0 and current asteroid < 0.',
      solutionCode: `import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class Main {
    public static int[] asteroidCollision(int[] asteroids) {
        Deque<Integer> stack = new ArrayDeque<>();

        for (int ast : asteroids) {
            boolean alive = true;
            while (alive && ast < 0 && !stack.isEmpty() && stack.peek() > 0) {
                if (stack.peek() < -ast) {
                    stack.pop(); // Top explodes, incoming continues
                } else if (stack.peek() == -ast) {
                    stack.pop(); // Both explode
                    alive = false;
                } else {
                    alive = false; // Incoming explodes
                }
            }
            if (alive) stack.push(ast);
        }

        int[] result = new int[stack.size()];
        for (int i = result.length - 1; i >= 0; i--) {
            result[i] = stack.pop();
        }
        return result;
    }

    public static void main(String[] args) {
        int[] asteroids = { 5, 10, -5 };
        System.out.println("Surviving: " + Arrays.toString(asteroidCollision(asteroids)));
    }
}`,
      output: 'Surviving: [5, 10]',
      explanation: 'Asteroid 10 meets -5: $|10| > |-5|$, so -5 explodes and 10 survives. Output is `[5, 10]`. Time complexity is $O(N)$ and space $O(N)$.'
    },
    {
      id: 'dsa-16-1-ex9',
      title: 'Simplify Unix File Path',
      problemStatement: 'Simplify an absolute Unix-style file path `"/a/./b/../../c/"` to its canonical form using a stack.',
      hint: 'Split path by "/". Ignore empty strings and ".". For "..", pop stack if non-empty. For directory names, push.',
      solutionCode: `import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static String simplifyPath(String path) {
        Deque<String> stack = new ArrayDeque<>();
        String[] parts = path.split("/");

        for (String p : parts) {
            if (p.equals("") || p.equals(".")) continue;
            if (p.equals("..")) {
                if (!stack.isEmpty()) stack.pop();
            } else {
                stack.push(p);
            }
        }

        if (stack.isEmpty()) return "/";
        StringBuilder sb = new StringBuilder();
        while (!stack.isEmpty()) {
            sb.append("/").append(stack.pollLast()); // Read from bottom to top
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println("Canonical: " + simplifyPath("/a/./b/../../c/"));
    }
}`,
      output: 'Canonical: /c',
      explanation: 'Path navigation: enter a, stay (.), enter b (/a/b), parent (/a), parent (/), enter c (/c). The stack cleanly eliminates redundant path components in $O(N)$ time.'
    },
    {
      id: 'dsa-16-1-ex10',
      title: 'Largest Rectangle in Histogram ($O(N)$ Stack)',
      problemStatement: 'Given an array of heights `[2, 1, 5, 6, 2, 3]`, find the area of the largest rectangle in the histogram in $O(N)$ time using a monotonic stack.',
      hint: 'Maintain a stack of increasing indices. When a shorter bar is encountered, pop and compute area with popped height as rectangle height.',
      solutionCode: `import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static int largestRectangleArea(int[] heights) {
        int n = heights.length;
        Deque<Integer> stack = new ArrayDeque<>();
        int maxArea = 0;

        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!stack.isEmpty() && h < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - 1 - stack.peek();
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }

    public static void main(String[] args) {
        int[] heights = { 2, 1, 5, 6, 2, 3 };
        System.out.println("Max Area: " + largestRectangleArea(heights));
    }
}`,
      output: 'Max Area: 10',
      explanation: 'Bars 5 and 6 form a rectangle of height 5 and width 2, yielding maximum area $5 \\times 2 = 10$. Monotonic stack ensures each index is pushed and popped exactly once in $O(N)$ time.'
    }
  ],

  // ── LESSON 16.2: Queue Architecture, FIFO Ring Buffers & Priority Queues ─
  'queue-adt-and-ring-buffers': [
    {
      id: 'dsa-16-2-ex1',
      title: 'Circular Queue / Ring Buffer using Array',
      problemStatement: 'Implement a circular queue `MyCircularQueue` of fixed size $k$ using an array with wrap-around modulo arithmetic (`(tail + 1) % capacity`).',
      hint: 'Maintain head, count, and capacity. Calculate tail = (head + count) % capacity.',
      solutionCode: `public class Main {
    static class CircularQueue {
        private int[] data;
        private int head;
        private int count;
        private int capacity;

        public CircularQueue(int k) {
            data = new int[k];
            head = 0;
            count = 0;
            capacity = k;
        }

        public boolean enQueue(int val) {
            if (isFull()) return false;
            int tail = (head + count) % capacity;
            data[tail] = val;
            count++;
            return true;
        }

        public boolean deQueue() {
            if (isEmpty()) return false;
            head = (head + 1) % capacity;
            count--;
            return true;
        }

        public int front() { return isEmpty() ? -1 : data[head]; }
        public boolean isEmpty() { return count == 0; }
        public boolean isFull() { return count == capacity; }
    }

    public static void main(String[] args) {
        CircularQueue q = new CircularQueue(3);
        q.enQueue(10);
        q.enQueue(20);
        q.enQueue(30);
        System.out.println("Enqueued 3 items. Full? " + q.isFull());
        System.out.println("Front: " + q.front());
        q.deQueue();
        q.enQueue(40); // Wraps around!
        System.out.println("New Front after dequeue: " + q.front());
    }
}`,
      output: `Enqueued 3 items. Full? true
Front: 10
New Front after dequeue: 20`,
      explanation: 'Circular indexing `(head + 1) % capacity` avoids shifting elements on dequeue, giving $O(1)$ enqueue and dequeue with zero memory reallocation.'
    },
    {
      id: 'dsa-16-2-ex2',
      title: 'Implement Queue using Two Stacks',
      problemStatement: 'Implement a FIFO queue `MyQueue` using two `ArrayDeque` stacks. Support `push`, `pop`, `peek`, and `empty` in $O(1)$ amortized time.',
      hint: 'Push into inStack. On pop/peek, if outStack is empty, transfer all elements from inStack to outStack (which reverses them into FIFO order).',
      solutionCode: `import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    static class MyQueue {
        private Deque<Integer> in = new ArrayDeque<>();
        private Deque<Integer> out = new ArrayDeque<>();

        public void push(int x) { in.push(x); }

        public int pop() {
            peek();
            return out.pop();
        }

        public int peek() {
            if (out.isEmpty()) {
                while (!in.isEmpty()) out.push(in.pop());
            }
            return out.peek();
        }

        public boolean empty() { return in.isEmpty() && out.isEmpty(); }
    }

    public static void main(String[] args) {
        MyQueue q = new MyQueue();
        q.push(1);
        q.push(2);
        System.out.println("Peek: " + q.peek()); // 1
        System.out.println("Pop: " + q.pop());   // 1
        System.out.println("Empty? " + q.empty()); // false
    }
}`,
      output: `Peek: 1
Pop: 1
Empty? false`,
      explanation: 'Each element is pushed into `in` once, transferred to `out` once, and popped from `out` once. Total work per element is $O(1)$ amortized.'
    },
    {
      id: 'dsa-16-2-ex3',
      title: 'Implement Stack using a Single Queue',
      problemStatement: 'Implement a LIFO stack `MyStack` using a single `ArrayDeque` queue by rotating elements on push.',
      hint: 'After enqueueing x, rotate the previous (size - 1) elements to the back of the queue so x ends up at the front.',
      solutionCode: `import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    static class MyStack {
        private Queue<Integer> q = new ArrayDeque<>();

        public void push(int x) {
            q.add(x);
            int sz = q.size();
            for (int i = 0; i < sz - 1; i++) {
                q.add(q.remove()); // Rotate front elements to back
            }
        }

        public int pop() { return q.remove(); }
        public int top() { return q.peek(); }
        public boolean empty() { return q.isEmpty(); }
    }

    public static void main(String[] args) {
        MyStack s = new MyStack();
        s.push(10);
        s.push(20);
        System.out.println("Top: " + s.top()); // 20
        System.out.println("Pop: " + s.pop()); // 20
        System.out.println("Top: " + s.top()); // 10
    }
}`,
      output: `Top: 20
Pop: 20
Top: 10`,
      explanation: 'Rotating the queue on push ensures the most recently added element always sits at the head of the queue, providing $O(1)$ pop and top.'
    },
    {
      id: 'dsa-16-2-ex4',
      title: 'Moving Average from Data Stream',
      problemStatement: 'Given a stream of integers and a window size $W = 3$, calculate the moving average of all integers in the sliding window using a Queue.',
      hint: 'Maintain a running sum. When queue size exceeds W, poll the oldest element and subtract from sum.',
      solutionCode: `import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    static class MovingAverage {
        private Queue<Integer> q = new ArrayDeque<>();
        private int windowSize;
        private double sum = 0.0;

        public MovingAverage(int size) { this.windowSize = size; }

        public double next(int val) {
            if (q.size() == windowSize) {
                sum -= q.poll();
            }
            q.offer(val);
            sum += val;
            return sum / q.size();
        }
    }

    public static void main(String[] args) {
        MovingAverage m = new MovingAverage(3);
        System.out.println(m.next(1));  // 1.0
        System.out.println(m.next(10)); // (1+10)/2 = 5.5
        System.out.println(m.next(3));  // (1+10+3)/3 = 4.666...
        System.out.println(m.next(5));  // (10+3+5)/3 = 6.0
    }
}`,
      output: `1.0
5.5
4.666666666666667
6.0`,
      explanation: 'By maintaining a running sum and evicting the oldest element with `q.poll()` in $O(1)$, computing each moving average is strictly $O(1)$ time and $O(W)$ space.'
    },
    {
      id: 'dsa-16-2-ex5',
      title: 'First Unique Character in Stream',
      problemStatement: 'Design a system that receives characters one by one and outputs the first non-repeating character observed so far in $O(1)$ time using a Queue and frequency table.',
      hint: 'Queue stores character arrival order. Increment frequency in int[256]. While queue front has frequency > 1, poll it.',
      solutionCode: `import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    static class StreamChecker {
        private int[] freq = new int[256];
        private Queue<Character> q = new ArrayDeque<>();

        public void add(char c) {
            freq[c]++;
            q.offer(c);
            while (!q.isEmpty() && freq[q.peek()] > 1) {
                q.poll(); // Evict duplicates from head
            }
        }

        public char getFirstUnique() {
            return q.isEmpty() ? '#' : q.peek();
        }
    }

    public static void main(String[] args) {
        StreamChecker sc = new StreamChecker();
        char[] stream = { 'a', 'a', 'b', 'c', 'b' };
        for (char c : stream) {
            sc.add(c);
            System.out.print(sc.getFirstUnique() + " ");
        }
        System.out.println();
    }
}`,
      output: '# # b b c ',
      explanation: 'When \'a\' repeats, `q.poll()` removes it. \'b\' becomes the first unique. When \'b\' repeats, \'c\' becomes the first unique. Each character is polled at most once: $O(1)$ amortized.'
    },
    {
      id: 'dsa-16-2-ex6',
      title: 'Recent Calls Request Counter (Sliding Window Queue)',
      problemStatement: 'Write a class `RecentCounter` that counts requests within the last 3000 milliseconds using a FIFO queue. `ping(t)` records a call at timestamp $t$.',
      hint: 'Offer timestamp t. While q.peek() < t - 3000, poll expired requests. Return q.size().',
      solutionCode: `import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    static class RecentCounter {
        private Queue<Integer> q = new ArrayDeque<>();

        public int ping(int t) {
            q.offer(t);
            while (q.peek() < t - 3000) {
                q.poll(); // Discard expired requests
            }
            return q.size();
        }
    }

    public static void main(String[] args) {
        RecentCounter rc = new RecentCounter();
        System.out.println(rc.ping(1));    // [1], returns 1
        System.out.println(rc.ping(100));  // [1, 100], returns 2
        System.out.println(rc.ping(3001)); // [1, 100, 3001], returns 3
        System.out.println(rc.ping(3002)); // [100, 3001, 3002], 1 expired, returns 3
    }
}`,
      output: `1
2
3
3`,
      explanation: 'At $t = 3002$, request 1 is strictly older than $3002 - 3000 = 2$, so it is evicted. The queue stores only active requests within the sliding window in $O(1)$ amortized time.'
    },
    {
      id: 'dsa-16-2-ex7',
      title: 'Kth Largest Element in Stream via Min-Heap PriorityQueue',
      problemStatement: 'Design a class `KthLargest` that finds the K-th largest element in a stream using Java\'s `PriorityQueue` as a min-heap of size $K$.',
      hint: 'Maintain a min-heap of capacity K. The top of the min-heap is always the K-th largest element.',
      solutionCode: `import java.util.PriorityQueue;

public class Main {
    static class KthLargest {
        private PriorityQueue<Integer> minHeap;
        private int k;

        public KthLargest(int k, int[] nums) {
            this.k = k;
            this.minHeap = new PriorityQueue<>(k);
            for (int n : nums) add(n);
        }

        public int add(int val) {
            minHeap.offer(val);
            if (minHeap.size() > k) {
                minHeap.poll(); // Evict smallest, keeping K largest
            }
            return minHeap.peek();
        }
    }

    public static void main(String[] args) {
        KthLargest kl = new KthLargest(3, new int[] { 4, 5, 8, 2 });
        System.out.println(kl.add(3));  // [4, 5, 8] -> returns 4
        System.out.println(kl.add(5));  // [5, 5, 8] -> returns 5
        System.out.println(kl.add(10)); // [5, 8, 10] -> returns 8
    }
}`,
      output: `4
5
8`,
      explanation: 'By capping the min-heap capacity at $K$, `minHeap.peek()` accesses the $K$-th largest element in $O(1)$ time, and each insertion runs in $O(\\log K)$ time.'
    },
    {
      id: 'dsa-16-2-ex8',
      title: 'Merge K Sorted Arrays via PriorityQueue',
      problemStatement: 'Merge 3 sorted integer arrays into a single sorted list using a PriorityQueue min-heap.',
      hint: 'Store an Entry(val, arrayIdx, elemIdx) in PriorityQueue. Pop min, add to result, and insert next element from the same array.',
      solutionCode: `import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

public class Main {
    static class Element implements Comparable<Element> {
        int val, arrIdx, elemIdx;
        Element(int v, int a, int e) { val = v; arrIdx = a; elemIdx = e; }
        public int compareTo(Element o) { return Integer.compare(this.val, o.val); }
    }

    public static List<Integer> mergeKArrays(int[][] arrays) {
        PriorityQueue<Element> pq = new PriorityQueue<>();
        for (int i = 0; i < arrays.length; i++) {
            if (arrays[i].length > 0) pq.offer(new Element(arrays[i][0], i, 0));
        }

        List<Integer> result = new ArrayList<>();
        while (!pq.isEmpty()) {
            Element cur = pq.poll();
            result.add(cur.val);
            if (cur.elemIdx + 1 < arrays[cur.arrIdx].length) {
                pq.offer(new Element(arrays[cur.arrIdx][cur.elemIdx + 1], cur.arrIdx, cur.elemIdx + 1));
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[][] sorted = {
            { 1, 4, 7 },
            { 2, 5, 8 },
            { 3, 6, 9 }
        };
        System.out.println("Merged: " + mergeKArrays(sorted));
    }
}`,
      output: 'Merged: [1, 2, 3, 4, 5, 6, 7, 8, 9]',
      explanation: 'The min-heap never exceeds $K$ elements. Total time for merging $N$ total elements across $K$ arrays is $O(N \\log K)$ with $O(K)$ space.'
    },
    {
      id: 'dsa-16-2-ex9',
      title: 'Circular Double-Ended Queue (Deque) Implementation',
      problemStatement: 'Implement a circular Deque with `insertFront`, `insertLast`, `deleteFront`, `deleteLast`, and `getRear` methods.',
      hint: 'Use modulo arithmetic: front = (front - 1 + capacity) % capacity for front insertion, and rear = (rear + 1) % capacity for rear insertion.',
      solutionCode: `public class Main {
    static class MyCircularDeque {
        private int[] data;
        private int front, rear, size, capacity;

        public MyCircularDeque(int k) {
            capacity = k;
            data = new int[k];
            front = 0; rear = 0; size = 0;
        }

        public boolean insertLast(int value) {
            if (isFull()) return false;
            data[rear] = value;
            rear = (rear + 1) % capacity;
            size++;
            return true;
        }

        public boolean insertFront(int value) {
            if (isFull()) return false;
            front = (front - 1 + capacity) % capacity;
            data[front] = value;
            size++;
            return true;
        }

        public int getFront() { return isEmpty() ? -1 : data[front]; }
        public int getRear() { return isEmpty() ? -1 : data[(rear - 1 + capacity) % capacity]; }
        public boolean isEmpty() { return size == 0; }
        public boolean isFull() { return size == capacity; }
    }

    public static void main(String[] args) {
        MyCircularDeque cd = new MyCircularDeque(3);
        cd.insertLast(1);
        cd.insertLast(2);
        cd.insertFront(3);
        System.out.println("Front: " + cd.getFront()); // 3
        System.out.println("Rear: " + cd.getRear());   // 2
    }
}`,
      output: `Front: 3
Rear: 2`,
      explanation: 'Both ends insert and remove in $O(1)$ constant time with circular wrap-around, forming the operational foundation of Java\'s `ArrayDeque`.'
    },
    {
      id: 'dsa-16-2-ex10',
      title: 'Top K Frequent Elements via Min-Heap PriorityQueue',
      problemStatement: 'Given an array of integers, return the $K$ most frequent elements using a HashMap frequency counter and a PriorityQueue min-heap.',
      hint: 'Count frequencies in HashMap. Add map entries to min-heap ordered by frequency. If heap size > K, poll smallest frequency.',
      solutionCode: `import java.util.*;

public class Main {
    public static List<Integer> topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int x : nums) counts.put(x, counts.getOrDefault(x, 0) + 1);

        PriorityQueue<Map.Entry<Integer, Integer>> minHeap =
            new PriorityQueue<>(Comparator.comparingInt(Map.Entry::getValue));

        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            minHeap.offer(entry);
            if (minHeap.size() > k) minHeap.poll();
        }

        List<Integer> result = new ArrayList<>();
        while (!minHeap.isEmpty()) result.add(minHeap.poll().getKey());
        return result;
    }

    public static void main(String[] args) {
        int[] nums = { 1, 1, 1, 2, 2, 3 };
        System.out.println("Top 2 frequent: " + topKFrequent(nums, 2));
    }
}`,
      output: 'Top 2 frequent: [2, 1]',
      explanation: 'Keeping a min-heap bounded by size $K$ ensures heap operations take $O(\\log K)$ time. Overall time is $O(N + D \\log K)$ where $D$ is unique elements, outperforming an $O(N \\log N)$ full sort.'
    }
  ],

  // ── LESSON 16.3: Singly & Doubly Linked List Internals ─────────────────
  'singly-doubly-linked-lists': [
    {
      id: 'dsa-16-3-ex1',
      title: 'Singly Linked List Node Insertion & Traversal',
      problemStatement: 'Construct a simple singly linked list `10 -> 20 -> 30`, append a node `40` to the tail, and print all values in order.',
      hint: 'Define a Node class with int val and Node next. Traverse using a temp pointer until temp.next == null.',
      solutionCode: `public class Main {
    static class Node {
        int val;
        Node next;
        Node(int v) { this.val = v; }
    }

    public static void main(String[] args) {
        Node head = new Node(10);
        head.next = new Node(20);
        head.next.next = new Node(30);

        // Append 40
        Node cur = head;
        while (cur.next != null) cur = cur.next;
        cur.next = new Node(40);

        // Print
        cur = head;
        while (cur != null) {
            System.out.print(cur.val + (cur.next != null ? " -> " : ""));
            cur = cur.next;
        }
        System.out.println();
    }
}`,
      output: '10 -> 20 -> 30 -> 40',
      explanation: 'Each node is allocated independently on the JVM heap containing a 4-byte value and an 8-byte reference pointer. Traversal takes $O(N)$ time.'
    },
    {
      id: 'dsa-16-3-ex2',
      title: 'In-Place Singly Linked List Reversal (Iterative)',
      problemStatement: 'Reverse a singly linked list in-place using three pointers (`prev`, `curr`, `next`) in $O(N)$ time and $O(1)$ auxiliary space.',
      hint: 'Save curr.next, redirect curr.next to prev, advance prev = curr, and curr = next.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next; // Save next
            curr.next = prev;              // Reverse pointer
            prev = curr;                   // Advance prev
            curr = nextTemp;               // Advance curr
        }
        return prev; // New head!
    }

    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);

        ListNode rev = reverseList(head);
        while (rev != null) {
            System.out.print(rev.val + " ");
            rev = rev.next;
        }
        System.out.println();
    }
}`,
      output: '3 2 1 ',
      explanation: 'Reversing pointer directions in-place mutates the existing nodes without allocating new memory, achieving $O(N)$ time and $O(1)$ auxiliary space.'
    },
    {
      id: 'dsa-16-3-ex3',
      title: 'Reverse Linked List Recursively',
      problemStatement: 'Reverse a singly linked list recursively. Explain the call stack unwinding behavior.',
      hint: 'Base case: head == null or head.next == null return head. In recursive unwind: head.next.next = head; head.next = null.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static ListNode reverseRecursive(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode newHead = reverseRecursive(head.next);
        head.next.next = head; // Point child back to parent
        head.next = null;      // Cut original link
        return newHead;
    }

    public static void main(String[] args) {
        ListNode head = new ListNode(10);
        head.next = new ListNode(20);
        head.next.next = new ListNode(30);

        ListNode rev = reverseRecursive(head);
        while (rev != null) {
            System.out.print(rev.val + " ");
            rev = rev.next;
        }
        System.out.println();
    }
}`,
      output: '30 20 10 ',
      explanation: 'The call stack dives to node 30 (newHead). During unwinding, `20.next.next = 20` points 30 back to 20. Call stack depth is $O(N)$, consuming $O(N)$ stack space.'
    },
    {
      id: 'dsa-16-3-ex4',
      title: 'Delete Node without Head Reference',
      problemStatement: 'Write a method `deleteNode(ListNode node)` that deletes a given non-tail node from a singly linked list given only a reference to that specific node.',
      hint: 'Copy the next node\'s value into the current node, then bypass the next node: node.val = node.next.val; node.next = node.next.next;',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static void deleteNode(ListNode node) {
        node.val = node.next.val;
        node.next = node.next.next;
    }

    public static void main(String[] args) {
        ListNode n1 = new ListNode(4);
        ListNode n2 = new ListNode(5);
        ListNode n3 = new ListNode(1);
        ListNode n4 = new ListNode(9);
        n1.next = n2; n2.next = n3; n3.next = n4;

        deleteNode(n2); // Delete node 5 without having head reference!

        ListNode cur = n1;
        while (cur != null) {
            System.out.print(cur.val + " ");
            cur = cur.next;
        }
        System.out.println();
    }
}`,
      output: '4 1 9 ',
      explanation: 'By overwriting the current node\'s value with the successor\'s value and cutting out the successor, deletion succeeds in $O(1)$ time without traversing from the head.'
    },
    {
      id: 'dsa-16-3-ex5',
      title: 'Remove Nth Node From End of List in One Pass',
      problemStatement: 'Remove the $N$-th node from the end of a linked list in a single pass using two pointers separated by a gap of $N$.',
      hint: 'Use a dummy node. Advance fast pointer by N + 1 steps. Then move both fast and slow until fast == null. Delete slow.next.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy, slow = dummy;

        for (int i = 0; i <= n; i++) fast = fast.next;
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next; // Remove Nth node
        return dummy.next;
    }

    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = new ListNode(5);

        ListNode res = removeNthFromEnd(head, 2); // Remove 4
        while (res != null) {
            System.out.print(res.val + " ");
            res = res.next;
        }
        System.out.println();
    }
}`,
      output: '1 2 3 5 ',
      explanation: 'Maintaining a fixed gap of $N$ steps between fast and slow ensures that when fast reaches the end, slow is positioned right before the node to be removed. Single pass $O(N)$ time.'
    },
    {
      id: 'dsa-16-3-ex6',
      title: 'Merge Two Sorted Linked Lists',
      problemStatement: 'Merge two sorted linked lists `1 -> 2 -> 4` and `1 -> 3 -> 4` into one sorted list using a dummy sentinel node.',
      hint: 'Compare l1.val and l2.val. Attach smaller node to tail. Advance pointers. Return dummy.next.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                tail.next = l1;
                l1 = l1.next;
            } else {
                tail.next = l2;
                l2 = l2.next;
            }
            tail = tail.next;
        }
        tail.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }

    public static void main(String[] args) {
        ListNode a = new ListNode(1); a.next = new ListNode(2); a.next.next = new ListNode(4);
        ListNode b = new ListNode(1); b.next = new ListNode(3); b.next.next = new ListNode(4);

        ListNode merged = mergeTwoLists(a, b);
        while (merged != null) {
            System.out.print(merged.val + " ");
            merged = merged.next;
        }
        System.out.println();
    }
}`,
      output: '1 1 2 3 4 4 ',
      explanation: 'Using a dummy sentinel node eliminates special-casing for the head pointer. The two lists are stitched together in $O(N + M)$ time and $O(1)$ auxiliary space.'
    },
    {
      id: 'dsa-16-3-ex7',
      title: 'Add Two Numbers Represented by Linked Lists',
      problemStatement: 'Given two non-empty linked lists representing two non-negative integers stored in reverse order (`2 -> 4 -> 3` + `5 -> 6 -> 4`), add them and return the sum as a linked list.',
      hint: 'Simulate elementary column addition with a carry variable. Create a new ListNode(sum % 10), and set carry = sum / 10.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        int carry = 0;

        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;
            if (l1 != null) { sum += l1.val; l1 = l1.next; }
            if (l2 != null) { sum += l2.val; l2 = l2.next; }
            carry = sum / 10;
            cur.next = new ListNode(sum % 10);
            cur = cur.next;
        }
        return dummy.next;
    }

    public static void main(String[] args) {
        ListNode l1 = new ListNode(2); l1.next = new ListNode(4); l1.next.next = new ListNode(3); // 342
        ListNode l2 = new ListNode(5); l2.next = new ListNode(6); l2.next.next = new ListNode(4); // 465

        ListNode sum = addTwoNumbers(l1, l2); // 342 + 465 = 807 -> 7 -> 0 -> 8
        while (sum != null) {
            System.out.print(sum.val + " ");
            sum = sum.next;
        }
        System.out.println();
    }
}`,
      output: '7 0 8 ',
      explanation: 'Reverse digit storage allows adding starting from the least significant digit (head). Total time is $O(\\max(N, M))$ and space $O(\\max(N, M))$ for output nodes.'
    },
    {
      id: 'dsa-16-3-ex8',
      title: 'Doubly Linked List Node Deletion',
      problemStatement: 'Implement a doubly linked list node deletion method `deleteNode(DNode target)` that disconnects target by updating its neighbor references.',
      hint: 'target.prev.next = target.next; target.next.prev = target.prev;',
      solutionCode: `public class Main {
    static class DNode {
        int val;
        DNode prev, next;
        DNode(int v) { this.val = v; }
    }

    public static void remove(DNode target) {
        if (target.prev != null) target.prev.next = target.next;
        if (target.next != null) target.next.prev = target.prev;
    }

    public static void main(String[] args) {
        DNode n1 = new DNode(10);
        DNode n2 = new DNode(20);
        DNode n3 = new DNode(30);
        n1.next = n2; n2.prev = n1;
        n2.next = n3; n3.prev = n2;

        remove(n2); // Delete middle node

        DNode cur = n1;
        while (cur != null) {
            System.out.print(cur.val + " ");
            cur = cur.next;
        }
        System.out.println();
    }
}`,
      output: '10 30 ',
      explanation: 'In a doubly linked list, deleting any node takes $O(1)$ time because direct access to both `prev` and `next` pointers avoids traversal from head.'
    },
    {
      id: 'dsa-16-3-ex9',
      title: 'Partition Linked List Around Pivot',
      problemStatement: 'Partition a linked list such that all nodes with values less than $X$ come before nodes with values greater than or equal to $X$, preserving original relative order.',
      hint: 'Maintain two separate lists: lessHead and greaterHead. Traverse original list appending to either, then concatenate lessTail.next = greaterHead.next.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static ListNode partition(ListNode head, int x) {
        ListNode lessDummy = new ListNode(0);
        ListNode greaterDummy = new ListNode(0);
        ListNode less = lessDummy, greater = greaterDummy;

        while (head != null) {
            if (head.val < x) {
                less.next = head;
                less = less.next;
            } else {
                greater.next = head;
                greater = greater.next;
            }
            head = head.next;
        }
        greater.next = null; // Important: terminate list!
        less.next = greaterDummy.next;
        return lessDummy.next;
    }

    public static void main(String[] args) {
        ListNode h = new ListNode(1);
        h.next = new ListNode(4);
        h.next.next = new ListNode(3);
        h.next.next.next = new ListNode(2);
        h.next.next.next.next = new ListNode(5);
        h.next.next.next.next.next = new ListNode(2);

        ListNode res = partition(h, 3);
        while (res != null) {
            System.out.print(res.val + " ");
            res = res.next;
        }
        System.out.println();
    }
}`,
      output: '1 2 2 4 3 5 ',
      explanation: 'Two dummy sentinel queues cleanly partition nodes $< 3$ and $\\ge 3$ while preserving relative stability in $O(N)$ time and $O(1)$ auxiliary space.'
    },
    {
      id: 'dsa-16-3-ex10',
      title: 'Remove Duplicates from Sorted Linked List',
      problemStatement: 'Given a sorted linked list, delete all duplicate values so that each element appears only once.',
      hint: 'If cur.val == cur.next.val, bypass: cur.next = cur.next.next. Else advance cur = cur.next.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static ListNode deleteDuplicates(ListNode head) {
        ListNode cur = head;
        while (cur != null && cur.next != null) {
            if (cur.val == cur.next.val) {
                cur.next = cur.next.next; // Bypass duplicate
            } else {
                cur = cur.next;
            }
        }
        return head;
    }

    public static void main(String[] args) {
        ListNode h = new ListNode(1);
        h.next = new ListNode(1);
        h.next.next = new ListNode(2);
        h.next.next.next = new ListNode(3);
        h.next.next.next.next = new ListNode(3);

        ListNode res = deleteDuplicates(h);
        while (res != null) {
            System.out.print(res.val + " ");
            res = res.next;
        }
        System.out.println();
    }
}`,
      output: '1 2 3 ',
      explanation: 'Because the list is sorted, duplicate values are consecutive. Bypassing duplicate nodes runs in $O(N)$ time and $O(1)$ space.'
    }
  ],

  // ── LESSON 16.4: Fast-Slow Pointers & Floyd's Cycle Detection ───────────
  'floyd-cycle-detection-and-pointers': [
    {
      id: 'dsa-16-4-ex1',
      title: 'Floyd\'s Cycle Detection (Tortoise and Hare)',
      problemStatement: 'Given a linked list, determine if it contains a cycle using Floyd\'s two-pointer algorithm in $O(N)$ time and $O(1)$ memory.',
      hint: 'Slow pointer moves 1 step, fast pointer moves 2 steps. If they ever point to the same node, a cycle exists.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static boolean hasCycle(ListNode head) {
        if (head == null) return false;
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true; // Cycle detected!
        }
        return false;
    }

    public static void main(String[] args) {
        ListNode n1 = new ListNode(3);
        ListNode n2 = new ListNode(2);
        ListNode n3 = new ListNode(0);
        ListNode n4 = new ListNode(-4);
        n1.next = n2; n2.next = n3; n3.next = n4;
        n4.next = n2; // Creates cycle back to n2

        System.out.println("Has cycle? " + hasCycle(n1));
    }
}`,
      output: 'Has cycle? true',
      explanation: 'If a cycle exists, the fast pointer closes the distance by 1 node per iteration, guaranteeing a collision without infinite loops. Time $O(N)$, space $O(1)$.'
    },
    {
      id: 'dsa-16-4-ex2',
      title: 'Find Cycle Start Node in Linked List',
      problemStatement: 'Given a linked list with a cycle, return the exact node where the cycle begins. Prove why resetting one pointer to head works.',
      hint: 'When slow and fast meet, reset one pointer to head. Move both 1 step at a time; their meeting point is the cycle start.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static ListNode detectCycle(ListNode head) {
        if (head == null) return null;
        ListNode slow = head, fast = head;
        boolean hasCycle = false;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                hasCycle = true;
                break;
            }
        }
        if (!hasCycle) return null;

        ListNode ptr1 = head;
        ListNode ptr2 = slow;
        while (ptr1 != ptr2) {
            ptr1 = ptr1.next;
            ptr2 = ptr2.next;
        }
        return ptr1; // Cycle start node!
    }

    public static void main(String[] args) {
        ListNode n1 = new ListNode(3);
        ListNode n2 = new ListNode(2);
        ListNode n3 = new ListNode(0);
        ListNode n4 = new ListNode(-4);
        n1.next = n2; n2.next = n3; n3.next = n4;
        n4.next = n2; // Cycle begins at n2

        ListNode start = detectCycle(n1);
        System.out.println("Cycle begins at node with value: " + start.val);
    }
}`,
      output: 'Cycle begins at node with value: 2',
      explanation: 'Mathematical proof: distance from head to cycle start equals distance from collision node to cycle start modulo cycle length ($F = kC - a$). Moving both 1 step converges at the cycle start.'
    },
    {
      id: 'dsa-16-4-ex3',
      title: 'Calculate Length of Linked List Cycle',
      problemStatement: 'Once a cycle is detected, determine the exact number of nodes inside the cycle in $O(1)$ space.',
      hint: 'From the meeting point, hold fast stationary and advance slow until it returns to the meeting point, counting steps.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static int cycleLength(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                int length = 0;
                do {
                    slow = slow.next;
                    length++;
                } while (slow != fast);
                return length;
            }
        }
        return 0; // No cycle
    }

    public static void main(String[] args) {
        ListNode n1 = new ListNode(1);
        ListNode n2 = new ListNode(2);
        ListNode n3 = new ListNode(3);
        ListNode n4 = new ListNode(4);
        n1.next = n2; n2.next = n3; n3.next = n4;
        n4.next = n2; // Cycle: 2 -> 3 -> 4 -> 2 (3 nodes)

        System.out.println("Cycle length: " + cycleLength(n1));
    }
}`,
      output: 'Cycle length: 3',
      explanation: 'Traversing around the cycle from the collision point counts the 3 loop nodes (2, 3, 4) in $O(C)$ time with zero extra allocations.'
    },
    {
      id: 'dsa-16-4-ex4',
      title: 'Find Middle Node of Linked List in One Pass',
      problemStatement: 'Find the middle node of a linked list in a single pass. For even length lists, return the second middle node.',
      hint: 'Advance slow by 1 step and fast by 2 steps. When fast == null or fast.next == null, slow is at the middle.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    public static void main(String[] args) {
        ListNode h = new ListNode(1);
        h.next = new ListNode(2);
        h.next.next = new ListNode(3);
        h.next.next.next = new ListNode(4);
        h.next.next.next.next = new ListNode(5);

        System.out.println("Middle node: " + middleNode(h).val); // 3
    }
}`,
      output: 'Middle node: 3',
      explanation: 'Because fast travels at twice the speed of slow, when fast reaches the end of the list ($N$ steps), slow has covered exactly $N/2$ steps, pointing to the middle in $O(N)$ time.'
    },
    {
      id: 'dsa-16-4-ex5',
      title: 'Palindrome Linked List Verification ($O(1)$ Space)',
      problemStatement: 'Determine whether a linked list is a palindrome in $O(N)$ time and $O(1)$ auxiliary space without allocating arrays or stack buffers.',
      hint: '1) Find middle with slow/fast. 2) Reverse second half. 3) Compare first half with reversed second half. 4) (Optional) restore list.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;

        // 1. Find middle
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // 2. Reverse second half
        ListNode prev = null, curr = slow;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }

        // 3. Compare halves
        ListNode p1 = head, p2 = prev;
        boolean palindrome = true;
        while (p2 != null) {
            if (p1.val != p2.val) { palindrome = false; break; }
            p1 = p1.next;
            p2 = p2.next;
        }
        return palindrome;
    }

    public static void main(String[] args) {
        ListNode h = new ListNode(1);
        h.next = new ListNode(2);
        h.next.next = new ListNode(2);
        h.next.next.next = new ListNode(1);

        System.out.println("1->2->2->1 is palindrome? " + isPalindrome(h));
    }
}`,
      output: '1->2->2->1 is palindrome? true',
      explanation: 'Reversing the second half in-place avoids allocating a duplicate array or stack, achieving $O(N)$ time and $O(1)$ auxiliary space.'
    },
    {
      id: 'dsa-16-4-ex6',
      title: 'Intersection of Two Linked Lists',
      problemStatement: 'Find the node where two singly linked lists intersect in $O(N + M)$ time and $O(1)$ auxiliary space.',
      hint: 'Traverse list A and list B simultaneously. When pointer A reaches null, switch to head B. When B reaches null, switch to head A. They collide at the intersection.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) return null;
        ListNode pA = headA, pB = headB;

        while (pA != pB) {
            pA = (pA == null) ? headB : pA.next;
            pB = (pB == null) ? headA : pB.next;
        }
        return pA; // Either intersection node or null
    }

    public static void main(String[] args) {
        ListNode common = new ListNode(8);
        common.next = new ListNode(10);

        ListNode a = new ListNode(4); a.next = new ListNode(1); a.next.next = common;
        ListNode b = new ListNode(5); b.next = new ListNode(6); b.next.next = new ListNode(1); b.next.next.next = common;

        ListNode intersect = getIntersectionNode(a, b);
        System.out.println("Intersect at node val: " + (intersect != null ? intersect.val : "null"));
    }
}`,
      output: 'Intersect at node val: 8',
      explanation: 'Each pointer traverses $Length(A) + Length(B)$. The difference in path lengths is neutralized after redirecting to the other list\'s head, ensuring synchronized collision.'
    },
    {
      id: 'dsa-16-4-ex7',
      title: 'Reorder List (Fold Around Midpoint)',
      problemStatement: 'Reorder linked list $L_0 \\to L_1 \\to ... \\to L_{n-1} \\to L_n$ into $L_0 \\to L_n \\to L_1 \\to L_{n-1} \\to L_2 \\to ...$ in-place.',
      hint: '1) Find middle. 2) Reverse second half. 3) Interleave nodes from first half and second half.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static void reorderList(ListNode head) {
        if (head == null || head.next == null) return;

        // 1. Split at middle
        ListNode slow = head, fast = head, prev = null;
        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        prev.next = null; // Cut into two separate lists

        // 2. Reverse second half
        ListNode p2 = null, curr = slow;
        while (curr != null) {
            ListNode t = curr.next; curr.next = p2; p2 = curr; curr = t;
        }

        // 3. Interleave
        ListNode p1 = head;
        while (p1 != null && p2 != null) {
            ListNode n1 = p1.next, n2 = p2.next;
            p1.next = p2;
            if (n1 == null) break;
            p2.next = n1;
            p1 = n1;
            p2 = n2;
        }
    }

    public static void main(String[] args) {
        ListNode h = new ListNode(1);
        h.next = new ListNode(2);
        h.next.next = new ListNode(3);
        h.next.next.next = new ListNode(4);

        reorderList(h);
        while (h != null) {
            System.out.print(h.val + " ");
            h = h.next;
        }
        System.out.println();
    }
}`,
      output: '1 4 2 3 ',
      explanation: 'Splitting, reversing, and interleaving executes in $O(N)$ time and $O(1)$ space, producing $1 \\to 4 \\to 2 \\to 3$.'
    },
    {
      id: 'dsa-16-4-ex8',
      title: 'Odd Even Linked List Segregation',
      problemStatement: 'Group all odd-indexed nodes together followed by even-indexed nodes in $O(N)$ time and $O(1)$ space. Relative order among odds and evens must be preserved.',
      hint: 'Maintain odd and even pointers. Connect odd.next = even.next, then even.next = odd.next. Finally odd.next = evenHead.',
      solutionCode: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static ListNode oddEvenList(ListNode head) {
        if (head == null) return null;
        ListNode odd = head, even = head.next, evenHead = even;

        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;
            even.next = odd.next;
            even = even.next;
        }
        odd.next = evenHead;
        return head;
    }

    public static void main(String[] args) {
        ListNode h = new ListNode(1);
        h.next = new ListNode(2);
        h.next.next = new ListNode(3);
        h.next.next.next = new ListNode(4);
        h.next.next.next.next = new ListNode(5);

        ListNode res = oddEvenList(h);
        while (res != null) {
            System.out.print(res.val + " ");
            res = res.next;
        }
        System.out.println();
    }
}`,
      output: '1 3 5 2 4 ',
      explanation: 'Odd indices (1, 3, 5) are linked together, and even indices (2, 4) are linked together, then concatenated in $O(N)$ time and $O(1)$ space.'
    },
    {
      id: 'dsa-16-4-ex9',
      title: 'Happy Number Cycle Detection via Fast-Slow Pointer',
      problemStatement: 'Determine if integer $N = 19$ is a Happy Number: replace $N$ with the sum of squares of its digits repeatedly until it reaches 1, or detect cycle using Floyd\'s algorithm.',
      hint: 'Treat next sum of squared digits as next pointer. Fast moves two steps, slow moves one step.',
      solutionCode: `public class Main {
    public static int getNext(int n) {
        int sum = 0;
        while (n > 0) {
            int d = n % 10;
            sum += d * d;
            n /= 10;
        }
        return sum;
    }

    public static boolean isHappy(int n) {
        int slow = n;
        int fast = getNext(n);
        while (fast != 1 && slow != fast) {
            slow = getNext(slow);
            fast = getNext(getNext(fast));
        }
        return fast == 1;
    }

    public static void main(String[] args) {
        System.out.println("19 is happy? " + isHappy(19));
        System.out.println("2 is happy? " + isHappy(2));
    }
}`,
      output: `19 is happy? true
2 is happy? false`,
      explanation: 'For 19: $1^2+9^2=82 \\to 68 \\to 100 \\to 1$. For 2, digits enter cycle $4 \\to 16 \\to 37 \\to 58 \\to 89 \\to 145 \\to 42 \\to 20 \\to 4$. Floyd\'s algorithm detects the cycle without a HashSet in $O(1)$ space.'
    },
    {
      id: 'dsa-16-4-ex10',
      title: 'Split Circular Linked List into Two Halves',
      problemStatement: 'Given a circular linked list, split it into two circular linked lists of equal size (or first half having one more node) in $O(N)$ time and $O(1)$ space.',
      hint: 'Use fast and slow pointers where fast moves 2 steps while fast.next != head and fast.next.next != head.',
      solutionCode: `public class Main {
    static class Node {
        int val;
        Node next;
        Node(int v) { this.val = v; }
    }

    public static void splitCircular(Node head) {
        if (head == null) return;
        Node slow = head, fast = head;

        while (fast.next != head && fast.next.next != head) {
            fast = fast.next.next;
            slow = slow.next;
        }
        if (fast.next.next == head) fast = fast.next; // Even elements adjust

        Node head1 = head;
        Node head2 = slow.next;

        fast.next = slow.next; // Second circular list
        slow.next = head;      // First circular list

        System.out.println("First circular head: " + head1.val + ", Second circular head: " + head2.val);
    }

    public static void main(String[] args) {
        Node n1 = new Node(1);
        Node n2 = new Node(2);
        Node n3 = new Node(3);
        Node n4 = new Node(4);
        n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n1;

        splitCircular(n1);
    }
}`,
      output: 'First circular head: 1, Second circular head: 3',
      explanation: 'Fast-slow pointers identify midpoint node 2. Re-linking `slow.next = head1` and `fast.next = head2` forms two independent circular lists in $O(N)$ time and $O(1)$ space.'
    }
  ]
};
