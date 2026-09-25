import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// DEDICATED HANDS-ON CODING ASSIGNMENTS FOR ARRAYS & 2D MATRIX
// 40 Comprehensive Exercises (10 per Lesson)
// ============================================================

export const arraysExercises: Record<string, ProgrammingExercise[]> = {
  // ────────────────────────────────────────────────────────────
  // LESSON 7.1: ARRAY DECLARATION, MEMORY ALLOCATION & INDEXING
  // ────────────────────────────────────────────────────────────
  'array-declaration-and-memory': [
    {
      id: 'arr-dec-1',
      title: 'Print Array Elements and Length',
      problemStatement: `Write a Java program to practice basic array declaration and indexing:
1. Declare and initialize an integer array named \`numbers\` with values: \`10, 20, 30, 40, 50\`.
2. Print the total length of the array using its \`.length\` property.
3. Print the first element (index 0).
4. Print the middle element (index \`length / 2\`).
5. Print the last element using \`numbers[numbers.length - 1]\`.`,
      hint: 'Remember that array length is accessed via .length (no parentheses) and the last index is always length - 1.',
      solutionCode: `public class ArrayBasics {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};

        System.out.println("Array Length: " + numbers.length);
        System.out.println("First Element: " + numbers[0]);
        System.out.println("Middle Element: " + numbers[numbers.length / 2]);
        System.out.println("Last Element: " + numbers[numbers.length - 1]);
    }
}`,
      output: `Array Length: 5
First Element: 10
Middle Element: 30
Last Element: 50`,
      explanation: 'In Java, array indexing is 0-based. For an array of length 5, valid indices are 0, 1, 2, 3, and 4. The last valid element is always accessed at numbers.length - 1.'
    },
    {
      id: 'arr-dec-2',
      title: 'Default Initialization Values of Primitive Arrays',
      problemStatement: `Write a Java program to verify default values assigned to array elements by the JVM:
1. Allocate an \`int[]\` of size 2 using the \`new\` keyword.
2. Allocate a \`double[]\` of size 2.
3. Allocate a \`boolean[]\` of size 2.
4. Allocate a \`char[]\` of size 2.
5. Allocate a \`String[]\` of size 2.
6. Print the element at index 0 for each array to demonstrate automatic JVM zeroing.`,
      hint: 'When arrays are allocated with "new", the JVM automatically zeroes out heap memory: numbers become 0/0.0, boolean becomes false, char becomes \\u0000, and objects become null.',
      solutionCode: `public class DefaultValuesDemo {
    public static void main(String[] args) {
        int[] intArr = new int[2];
        double[] doubleArr = new double[2];
        boolean[] boolArr = new boolean[2];
        char[] charArr = new char[2];
        String[] strArr = new String[2];

        System.out.println("int default: " + intArr[0]);
        System.out.println("double default: " + doubleArr[0]);
        System.out.println("boolean default: " + boolArr[0]);
        System.out.println("char default (as int): " + (int) charArr[0]);
        System.out.println("String default: " + strArr[0]);
    }
}`,
      output: `int default: 0
double default: 0.0
boolean default: false
char default (as int): 0
String default: null`,
      explanation: 'Unlike local primitive variables which must be manually initialized before reading, array elements live inside heap objects and are automatically assigned type-specific default values by the JVM.'
    },
    {
      id: 'arr-dec-3',
      title: 'Manual Array Population Using a Loop',
      problemStatement: `Write a Java program to allocate an array and populate it programmatically:
1. Allocate an integer array of size 5 using \`new int[5]\`.
2. Using a standard \`for\` loop, assign each index \`i\` the value \`(i + 1) * 10\`.
3. Print each index and its assigned value formatted as \`Index i: value\`.`,
      hint: 'Loop from i = 0 to i < arr.length, assigning arr[i] = (i + 1) * 10.',
      solutionCode: `public class PopulateArray {
    public static void main(String[] args) {
        int[] multiples = new int[5];

        for (int i = 0; i < multiples.length; i++) {
            multiples[i] = (i + 1) * 10;
        }

        for (int i = 0; i < multiples.length; i++) {
            System.out.println("Index " + i + ": " + multiples[i]);
        }
    }
}`,
      output: `Index 0: 10
Index 1: 20
Index 2: 30
Index 3: 40
Index 4: 50`,
      explanation: 'Using "new int[5]" creates 5 contiguous slots on the heap initialized to 0. The first loop writes calculated values into each slot; the second loop reads and displays them.'
    },
    {
      id: 'arr-dec-4',
      title: 'Array Reference Aliasing',
      problemStatement: `Write a Java program demonstrating that assigning one array variable to another creates an alias:
1. Declare \`int[] original = {100, 200, 300};\`.
2. Assign \`int[] alias = original;\`.
3. Modify \`alias[1] = 999;\`.
4. Print both \`original[1]\` and \`alias[1]\` to show both reflect the change.
5. Print whether \`original == alias\` evaluates to true.`,
      hint: 'In Java, the array variable holds a heap memory address. Assigning alias = original copies the address, not the array elements.',
      solutionCode: `public class ReferenceAliasing {
    public static void main(String[] args) {
        int[] original = {100, 200, 300};
        int[] alias = original;

        alias[1] = 999;

        System.out.println("original[1]: " + original[1]);
        System.out.println("alias[1]: " + alias[1]);
        System.out.println("Are references equal? " + (original == alias));
    }
}`,
      output: `original[1]: 999
alias[1]: 999
Are references equal? true`,
      explanation: 'Array variables store object references. Assigning alias = original does not clone the array; both variables point to the exact same heap memory block. Changing one modifies both.'
    },
    {
      id: 'arr-dec-5',
      title: 'Swap First and Last Elements',
      problemStatement: `Write a Java program to swap the first and last elements of an array in-place:
1. Initialize an array \`int[] items = {15, 24, 38, 42, 59};\`.
2. Print the array before swapping.
3. Using a temporary variable \`int temp\`, swap the element at index 0 with the element at \`items.length - 1\`.
4. Print the array after swapping to verify 15 and 59 exchanged places.`,
      hint: 'Store items[0] in temp, assign items[items.length - 1] to items[0], then assign temp to items[items.length - 1].',
      solutionCode: `public class SwapFirstLast {
    public static void main(String[] args) {
        int[] items = {15, 24, 38, 42, 59};

        System.out.print("Before Swap: ");
        for (int i = 0; i < items.length; i++) {
            System.out.print(items[i] + " ");
        }
        System.out.println();

        // Swap first and last elements
        int temp = items[0];
        items[0] = items[items.length - 1];
        items[items.length - 1] = temp;

        System.out.print("After Swap:  ");
        for (int i = 0; i < items.length; i++) {
            System.out.print(items[i] + " ");
        }
        System.out.println();
    }
}`,
      output: `Before Swap: 15 24 38 42 59 
After Swap:  59 24 38 42 15 `,
      explanation: 'In-place swapping uses O(1) auxiliary memory. Preserving items[0] in temp prevents it from being permanently overwritten when items[items.length - 1] is copied to index 0.'
    },
    {
      id: 'arr-dec-6',
      title: 'Independent Deep Array Copy via Manual Loop',
      problemStatement: `Write a Java program to create a truly independent clone of an array:
1. Declare \`int[] original = {10, 20, 30};\`.
2. Allocate a brand new array \`int[] copy = new int[original.length];\`.
3. Copy each element from \`original\` into \`copy\` using a loop.
4. Modify \`copy[0] = 777;\`.
5. Print \`original[0]\` and \`copy[0]\` to prove that modifying \`copy\` does NOT affect \`original\`.`,
      hint: 'Allocate new int[original.length] on the heap so copy has its own separate memory block.',
      solutionCode: `public class DeepCopyDemo {
    public static void main(String[] args) {
        int[] original = {10, 20, 30};

        // Allocate a separate heap array
        int[] copy = new int[original.length];
        for (int i = 0; i < original.length; i++) {
            copy[i] = original[i];
        }

        // Mutate the copy
        copy[0] = 777;

        System.out.println("original[0]: " + original[0]);
        System.out.println("copy[0]:     " + copy[0]);
        System.out.println("Are references equal? " + (original == copy));
    }
}`,
      output: `original[0]: 10
copy[0]:     777
Are references equal? false`,
      explanation: 'Because copy was instantiated with "new int[original.length]", it occupies a completely separate heap memory block. Mutating copy[0] leaves original[0] untouched.'
    },
    {
      id: 'arr-dec-7',
      title: 'Safe Array Index Access with Boundary Validation',
      problemStatement: `Write a Java program that validates indices before accessing array elements to prevent runtime exceptions:
1. Declare \`int[] scores = {88, 92, 79, 95};\`.
2. Check two indices: \`int index1 = 2;\` and \`int index2 = 4;\`.
3. For each index, check if \`index >= 0 && index < scores.length\`.
4. If valid, print \`Element at index X: value\`. Otherwise, print \`Index X is out of bounds!\`.`,
      hint: 'The valid index range for any array of length N is strictly 0 to N - 1 inclusive.',
      solutionCode: `public class SafeAccessDemo {
    public static void main(String[] args) {
        int[] scores = {88, 92, 79, 95};

        int[] testIndices = {2, 4};

        for (int idx : testIndices) {
            if (idx >= 0 && idx < scores.length) {
                System.out.println("Element at index " + idx + ": " + scores[idx]);
            } else {
                System.out.println("Index " + idx + " is out of bounds!");
            }
        }
    }
}`,
      output: `Element at index 2: 79
Index 4 is out of bounds!`,
      explanation: 'An array of length 4 has valid indices 0, 1, 2, and 3. Testing idx >= 0 && idx < scores.length ensures the program never crashes with an ArrayIndexOutOfBoundsException.'
    },
    {
      id: 'arr-dec-8',
      title: 'Sum of Extreme Ends with Boundary Check',
      problemStatement: `Write a Java program to compute the sum of the first and last elements of an array:
1. Test with array \`int[] arr = {7, 14, 21, 28, 35};\`.
2. Check if the array is non-empty. If empty, print 0.
3. If the array has only 1 element, print that element.
4. If the array has 2 or more elements, print the sum of \`arr[0]\` and \`arr[arr.length - 1]\`.`,
      hint: 'Guard against empty arrays using arr.length == 0, and single-element arrays using arr.length == 1.',
      solutionCode: `public class ExtremeSum {
    public static void main(String[] args) {
        int[] arr = {7, 14, 21, 28, 35};

        if (arr == null || arr.length == 0) {
            System.out.println("Sum: 0");
        } else if (arr.length == 1) {
            System.out.println("Sum: " + arr[0]);
        } else {
            int sum = arr[0] + arr[arr.length - 1];
            System.out.println("First: " + arr[0] + ", Last: " + arr[arr.length - 1]);
            System.out.println("Sum of extremes: " + sum);
        }
    }
}`,
      output: `First: 7, Last: 35
Sum of extremes: 42`,
      explanation: 'Defensive programming checks both array existence and length before accessing index 0 or length - 1, preventing NullPointerException and ArrayIndexOutOfBoundsException.'
    },
    {
      id: 'arr-dec-9',
      title: 'Double Elements at Even Indices',
      problemStatement: `Write a Java program to update specific indices in an array:
1. Initialize \`int[] vals = {5, 12, 8, 3, 20, 7};\`.
2. Iterate through the array and double the value of elements located at EVEN indices (\`i % 2 == 0\`).
3. Elements at odd indices should remain unchanged.
4. Print the updated array elements separated by spaces.`,
      hint: 'In an indexed for loop, check if i % 2 == 0, then update vals[i] = vals[i] * 2.',
      solutionCode: `public class UpdateEvenIndices {
    public static void main(String[] args) {
        int[] vals = {5, 12, 8, 3, 20, 7};

        for (int i = 0; i < vals.length; i++) {
            if (i % 2 == 0) {
                vals[i] = vals[i] * 2;
            }
        }

        System.out.print("Updated Array: ");
        for (int i = 0; i < vals.length; i++) {
            System.out.print(vals[i] + " ");
        }
        System.out.println();
    }
}`,
      output: 'Updated Array: 10 12 16 3 40 7 ',
      explanation: 'Indices 0, 2, and 4 are even. Their values (5, 8, 20) are doubled to (10, 16, 40). Odd index values (12, 3, 7) remain untouched.'
    },
    {
      id: 'arr-dec-10',
      title: 'Simulate Dynamic Array Resizing',
      problemStatement: `Write a Java program to simulate dynamic array expansion:
1. Start with an initial array: \`int[] small = {1, 2, 3};\`.
2. Print its initial length.
3. Create a new array \`larger\` with double the capacity: \`new int[small.length * 2]\`.
4. Copy all elements from \`small\` into \`larger\`.
5. Insert values \`40\` and \`50\` into the newly available slots at indices 3 and 4.
6. Reassign \`small = larger;\` and print the new length and all elements.`,
      hint: 'Since arrays cannot grow in-place, allocate a new array of size small.length * 2, copy elements, and reassign the reference.',
      solutionCode: `public class DynamicArraySimulation {
    public static void main(String[] args) {
        int[] small = {1, 2, 3};
        System.out.println("Original Length: " + small.length);

        // Allocate larger array (capacity 6)
        int[] larger = new int[small.length * 2];
        for (int i = 0; i < small.length; i++) {
            larger[i] = small[i];
        }

        // Add elements into new slots
        larger[3] = 40;
        larger[4] = 50;

        // Reassign reference
        small = larger;

        System.out.println("New Length: " + small.length);
        System.out.print("Elements: ");
        for (int val : small) {
            System.out.print(val + " ");
        }
        System.out.println();
    }
}`,
      output: `Original Length: 3
New Length: 6
Elements: 1 2 3 40 50 0 `,
      explanation: 'This illustrates how dynamic collections work internally: when capacity is exhausted, a new larger array is allocated on the heap, existing elements are migrated over, and the reference is updated.'
    }
  ],

  // ────────────────────────────────────────────────────────────
  // LESSON 7.2: ARRAY TRAVERSALS & COMMON PATTERNS
  // ────────────────────────────────────────────────────────────
  'array-traversals-and-algorithms': [
    {
      id: 'arr-trav-1',
      title: 'Sum and Average of Array Elements',
      problemStatement: `Write a Java program to compute the sum and floating-point average of an array:
1. Initialize an array: \`int[] numbers = {15, 25, 35, 45, 55};\`.
2. Calculate the total sum of all elements using a loop.
3. Calculate the average by dividing sum by \`numbers.length\` (ensure floating-point precision).
4. Print both the sum and the average.`,
      hint: 'Cast sum to double before dividing: (double) sum / numbers.length to prevent integer truncation.',
      solutionCode: `public class SumAndAverage {
    public static void main(String[] args) {
        int[] numbers = {15, 25, 35, 45, 55};

        int sum = 0;
        for (int i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }

        double average = (double) sum / numbers.length;

        System.out.println("Sum: " + sum);
        System.out.println("Average: " + average);
    }
}`,
      output: `Sum: 175
Average: 35.0`,
      explanation: 'We iterate through all elements, accumulating each into the sum variable. Casting to double ensures decimal division rather than integer truncation.'
    },
    {
      id: 'arr-trav-2',
      title: 'Find Maximum and Minimum Values',
      problemStatement: `Write a Java program to find the maximum and minimum elements in an array in a single pass:
1. Initialize an array with mixed values including negative numbers: \`int[] arr = {-12, 45, 0, 89, -34, 67};\`.
2. Initialize \`min\` and \`max\` with the first element of the array.
3. Traverse the array and update \`min\` and \`max\` whenever a smaller or larger element is encountered.
4. Print both values.`,
      hint: 'Never initialize min/max to 0; always initialize them to arr[0] to correctly handle negative values.',
      solutionCode: `public class MinMaxSinglePass {
    public static void main(String[] args) {
        int[] arr = {-12, 45, 0, 89, -34, 67};

        int min = arr[0];
        int max = arr[0];

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
            if (arr[i] > max) {
                max = arr[i];
            }
        }

        System.out.println("Minimum: " + min);
        System.out.println("Maximum: " + max);
    }
}`,
      output: `Minimum: -34
Maximum: 89`,
      explanation: 'Initializing min and max with arr[0] ensures comparisons are grounded in actual array data. The loop starts at index 1 and updates records in a single O(N) pass.'
    },
    {
      id: 'arr-trav-3',
      title: 'In-Place Two-Pointer Array Reversal',
      problemStatement: `Write a Java program to reverse an array in-place without creating a second array:
1. Initialize \`int[] arr = {1, 2, 3, 4, 5, 6};\`.
2. Print the array before reversal.
3. Use two pointers (\`left = 0\` and \`right = arr.length - 1\`) with a \`while\` loop to swap elements in-place.
4. Print the array after reversal.`,
      hint: 'In each iteration of while (left < right), swap arr[left] and arr[right], then left++ and right--.',
      solutionCode: `public class InPlaceReversal {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6};

        System.out.print("Before Reversal: ");
        for (int val : arr) System.out.print(val + " ");
        System.out.println();

        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }

        System.out.print("After Reversal:  ");
        for (int val : arr) System.out.print(val + " ");
        System.out.println();
    }
}`,
      output: `Before Reversal: 1 2 3 4 5 6 
After Reversal:  6 5 4 3 2 1 `,
      explanation: 'The two-pointer technique runs in O(N/2) = O(N) time and requires only O(1) auxiliary space, directly mutating the existing array on the heap.'
    },
    {
      id: 'arr-trav-4',
      title: 'Linear Search for Target Element',
      problemStatement: `Write a Java program to perform linear search on an array:
1. Initialize \`int[] values = {42, 17, 89, 33, 95, 21};\`.
2. Define a target value: \`int target = 33;\`.
3. Search sequentially through the array. If the target is found, record its index and break immediately.
4. Print whether the target was found and at which index, or print \`-1\` if not found.`,
      hint: 'Initialize foundIndex = -1. Loop through the array, and if values[i] == target, set foundIndex = i and break.',
      solutionCode: `public class LinearSearchDemo {
    public static void main(String[] args) {
        int[] values = {42, 17, 89, 33, 95, 21};
        int target = 33;
        int foundIndex = -1;

        for (int i = 0; i < values.length; i++) {
            if (values[i] == target) {
                foundIndex = i;
                break; // Stop immediately upon locating target
            }
        }

        if (foundIndex != -1) {
            System.out.println("Target " + target + " found at index: " + foundIndex);
        } else {
            System.out.println("Target " + target + " not found (-1)");
        }
    }
}`,
      output: 'Target 33 found at index: 3',
      explanation: 'Linear search scans each element sequentially. Breaking early on a match avoids wasted iterations, achieving O(1) best case and O(N) worst case time complexity.'
    },
    {
      id: 'arr-trav-5',
      title: 'Count Occurrences of an Element',
      problemStatement: `Write a Java program to count how many times a given number appears in an array:
1. Initialize \`int[] numbers = {4, 7, 2, 7, 9, 7, 3, 7, 1};\`.
2. Define \`int target = 7;\`.
3. Traverse the array and increment a counter each time \`numbers[i] == target\`.
4. Print the total count.`,
      hint: 'Use a simple for-each loop to inspect every element and increment count if element equals target.',
      solutionCode: `public class CountOccurrences {
    public static void main(String[] args) {
        int[] numbers = {4, 7, 2, 7, 9, 7, 3, 7, 1};
        int target = 7;
        int count = 0;

        for (int num : numbers) {
            if (num == target) {
                count++;
            }
        }

        System.out.println("Number " + target + " appears " + count + " times.");
    }
}`,
      output: 'Number 7 appears 4 times.',
      explanation: 'Because we only need to read elements and count matches without modifying the array or needing indices, an enhanced for-each loop provides the cleanest implementation.'
    },
    {
      id: 'arr-trav-6',
      title: 'Find Second Largest Element',
      problemStatement: `Write a Java program to find the second largest distinct element in an array in a single O(N) pass:
1. Initialize \`int[] arr = {12, 35, 1, 10, 34, 35};\`.
2. Maintain \`largest\` and \`secondLargest\` initialized to \`Integer.MIN_VALUE\`.
3. If current element > \`largest\`, update \`secondLargest = largest\` and \`largest = element\`.
4. Else if current element > \`secondLargest\` and != \`largest\`, update \`secondLargest = element\`.
5. Print both values.`,
      hint: 'The condition element != largest is crucial to prevent duplicates of the maximum value from being recorded as the second largest.',
      solutionCode: `public class SecondLargestSinglePass {
    public static void main(String[] args) {
        int[] arr = {12, 35, 1, 10, 34, 35};

        int largest = Integer.MIN_VALUE;
        int secondLargest = Integer.MIN_VALUE;

        for (int val : arr) {
            if (val > largest) {
                secondLargest = largest;
                largest = val;
            } else if (val > secondLargest && val != largest) {
                secondLargest = val;
            }
        }

        System.out.println("Largest: " + largest);
        System.out.println("Second Largest: " + secondLargest);
    }
}`,
      output: `Largest: 35
Second Largest: 34`,
      explanation: 'By checking val != largest, the duplicate 35 is ignored and 34 is correctly identified as the second largest distinct element in a single linear pass.'
    },
    {
      id: 'arr-trav-7',
      title: 'Check if Array is Sorted in Ascending Order',
      problemStatement: `Write a Java program to determine whether an array is sorted in non-decreasing order:
1. Test with two arrays: \`int[] sorted = {2, 5, 8, 12, 19};\`, and \`int[] unsorted = {4, 9, 3, 11};\`.
2. Implement a loop checking if \`arr[i] > arr[i + 1]\`.
3. If an inversion is found, conclude that the array is not sorted.
4. Print the result for both arrays.`,
      hint: 'Stop the loop at i < arr.length - 1 to prevent arr[i + 1] from exceeding array bounds.',
      solutionCode: `public class CheckSortedArray {
    public static void main(String[] args) {
        int[] sorted = {2, 5, 8, 12, 19};
        int[] unsorted = {4, 9, 3, 11};

        System.out.println("Is sorted array sorted? " + isAscending(sorted));
        System.out.println("Is unsorted array sorted? " + isAscending(unsorted));
    }

    public static boolean isAscending(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                return false; // Found an out-of-order pair
            }
        }
        return true;
    }
}`,
      output: `Is sorted array sorted? true
Is unsorted array sorted? false`,
      explanation: 'Adjacent pairwise comparison runs in O(N) time. If arr[i] > arr[i + 1], sorted order is violated, allowing immediate early exit.'
    },
    {
      id: 'arr-trav-8',
      title: 'Separate Even and Odd Numbers',
      problemStatement: `Write a Java program to partition and display even and odd numbers from an array:
1. Initialize \`int[] numbers = {12, 7, 19, 24, 30, 5, 18, 9};\`.
2. First, print all even numbers on one line.
3. Second, print all odd numbers on the next line.`,
      hint: 'Use the modulo operator num % 2 == 0 for even numbers and num % 2 != 0 for odd numbers.',
      solutionCode: `public class SeparateEvenOdd {
    public static void main(String[] args) {
        int[] numbers = {12, 7, 19, 24, 30, 5, 18, 9};

        System.out.print("Even numbers: ");
        for (int num : numbers) {
            if (num % 2 == 0) {
                System.out.print(num + " ");
            }
        }
        System.out.println();

        System.out.print("Odd numbers:  ");
        for (int num : numbers) {
            if (num % 2 != 0) {
                System.out.print(num + " ");
            }
        }
        System.out.println();
    }
}`,
      output: `Even numbers: 12 24 30 18 
Odd numbers:  7 19 5 9 `,
      explanation: 'Filtering elements using conditions inside enhanced for-each loops allows clean sequential extraction of matching items.'
    },
    {
      id: 'arr-trav-9',
      title: 'Rotate Array Left by One Position',
      problemStatement: `Write a Java program to rotate array elements to the left by one position in-place:
1. Initialize \`int[] arr = {10, 20, 30, 40, 50};\`.
2. Store the first element (\`arr[0]\`) in a temporary variable \`first\`.
3. Shift each element one position to the left: \`arr[i] = arr[i + 1]\`.
4. Place the saved \`first\` element into the last index: \`arr[arr.length - 1] = first\`.
5. Print the rotated array.`,
      hint: 'Loop from i = 0 to i < arr.length - 1, shifting arr[i] = arr[i + 1], then put first at arr.length - 1.',
      solutionCode: `public class RotateLeftByOne {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};

        int first = arr[0];
        for (int i = 0; i < arr.length - 1; i++) {
            arr[i] = arr[i + 1];
        }
        arr[arr.length - 1] = first;

        System.out.print("Rotated Left: ");
        for (int val : arr) {
            System.out.print(val + " ");
        }
        System.out.println();
    }
}`,
      output: 'Rotated Left: 20 30 40 50 10 ',
      explanation: 'Left rotation shifts every element leftward by 1. Saving arr[0] first prevents it from being lost when arr[1] overwrites index 0.'
    },
    {
      id: 'arr-trav-10',
      title: 'Running Prefix Sum Array',
      problemStatement: `Write a Java program to compute the running prefix sum array of an input array:
1. Initialize \`int[] input = {3, 1, 4, 1, 5, 9};\`.
2. Create a new array \`int[] prefix = new int[input.length];\`.
3. Set \`prefix[0] = input[0]\`.
4. For each subsequent index \`i\`, compute \`prefix[i] = prefix[i - 1] + input[i]\`.
5. Print both the original and prefix sum arrays.`,
      hint: 'Prefix sum stores cumulative totals so far: prefix[i] is the sum of input[0] through input[i].',
      solutionCode: `public class PrefixSumDemo {
    public static void main(String[] args) {
        int[] input = {3, 1, 4, 1, 5, 9};
        int[] prefix = new int[input.length];

        prefix[0] = input[0];
        for (int i = 1; i < input.length; i++) {
            prefix[i] = prefix[i - 1] + input[i];
        }

        System.out.print("Input:  ");
        for (int val : input) System.out.print(val + " ");
        System.out.println();

        System.out.print("Prefix: ");
        for (int val : prefix) System.out.print(val + " ");
        System.out.println();
    }
}`,
      output: `Input:  3 1 4 1 5 9 
Prefix: 3 4 8 9 14 23 `,
      explanation: 'Prefix sums enable O(1) range sum queries. For example, sum from index 1 to 4 is prefix[4] - prefix[0] = 14 - 3 = 11 (1 + 4 + 1 + 5 = 11).'
    }
  ],

  // ────────────────────────────────────────────────────────────
  // LESSON 7.3: THE java.util.Arrays UTILITY CLASS
  // ────────────────────────────────────────────────────────────
  'arrays-utility-class': [
    {
      id: 'arr-util-1',
      title: 'Format Array with Arrays.toString',
      problemStatement: `Write a Java program demonstrating proper array printing:
1. Declare \`int[] numbers = {10, 25, 40, 55, 70};\`.
2. Print the array directly with \`System.out.println(numbers)\` and observe the memory hashcode.
3. Import \`java.util.Arrays\` and print with \`Arrays.toString(numbers)\` to obtain human-readable output.`,
      hint: 'Arrays inherit Object.toString() which prints type and hashcode. Arrays.toString() formats values as [10, 25, ...].',
      solutionCode: `import java.util.Arrays;

public class PrintArrayDemo {
    public static void main(String[] args) {
        int[] numbers = {10, 25, 40, 55, 70};

        // Arrays.toString formats elements cleanly
        System.out.println("Formatted: " + Arrays.toString(numbers));
    }
}`,
      output: 'Formatted: [10, 25, 40, 55, 70]',
      explanation: 'Arrays.toString() iterates over elements and builds a bracketed, comma-separated string representation suitable for logging and debugging.'
    },
    {
      id: 'arr-util-2',
      title: 'Sort Array in Ascending Order',
      problemStatement: `Write a Java program to sort an array using Dual-Pivot Quicksort:
1. Initialize an unsorted array: \`int[] data = {58, 23, 81, 12, 95, 4, 37};\`.
2. Print the array before sorting.
3. Call \`Arrays.sort(data)\` to sort the array in-place.
4. Print the array after sorting.`,
      hint: 'Arrays.sort(arr) modifies the array directly in-place in O(N log N) time.',
      solutionCode: `import java.util.Arrays;

public class SortArrayDemo {
    public static void main(String[] args) {
        int[] data = {58, 23, 81, 12, 95, 4, 37};

        System.out.println("Before: " + Arrays.toString(data));
        Arrays.sort(data);
        System.out.println("After:  " + Arrays.toString(data));
    }
}`,
      output: `Before: [58, 23, 81, 12, 95, 4, 37]
After:  [4, 12, 23, 37, 58, 81, 95]`,
      explanation: 'Arrays.sort() uses Dual-Pivot Quicksort for primitive types, sorting elements in-place with average O(N log N) time complexity.'
    },
    {
      id: 'arr-util-3',
      title: 'Sort Subarray Range',
      problemStatement: `Write a Java program to sort only a specific range within an array:
1. Initialize \`int[] nums = {99, 45, 12, 88, 34, 10, 55};\`.
2. Sort only the sub-range from index 1 up to index 5 (exclusive) using \`Arrays.sort(nums, 1, 5)\`.
3. Print the array to verify only elements at indices 1, 2, 3, and 4 were sorted.`,
      hint: 'The range [fromIndex, toIndex) includes fromIndex and excludes toIndex.',
      solutionCode: `import java.util.Arrays;

public class SubarraySortDemo {
    public static void main(String[] args) {
        int[] nums = {99, 45, 12, 88, 34, 10, 55};

        System.out.println("Original: " + Arrays.toString(nums));
        // Sort indices 1, 2, 3, 4 only
        Arrays.sort(nums, 1, 5);
        System.out.println("Sub-sorted: " + Arrays.toString(nums));
    }
}`,
      output: `Original: [99, 45, 12, 88, 34, 10, 55]
Sub-sorted: [99, 12, 34, 45, 88, 10, 55]`,
      explanation: 'Elements at index 0 (99) and indices 5, 6 (10, 55) remain undisturbed; only the subarray [45, 12, 88, 34] is sorted to [12, 34, 45, 88].'
    },
    {
      id: 'arr-util-4',
      title: 'Binary Search for Existing Key',
      problemStatement: `Write a Java program to search for an element using binary search:
1. Initialize an unsorted array: \`int[] items = {64, 25, 12, 22, 11};\`.
2. Sort the array using \`Arrays.sort(items)\`.
3. Use \`Arrays.binarySearch(items, 22)\` to find the target.
4. Print the sorted array and the returned index.`,
      hint: 'Always call Arrays.sort() before Arrays.binarySearch().',
      solutionCode: `import java.util.Arrays;

public class BinarySearchDemo {
    public static void main(String[] args) {
        int[] items = {64, 25, 12, 22, 11};

        Arrays.sort(items);
        System.out.println("Sorted: " + Arrays.toString(items));

        int target = 22;
        int index = Arrays.binarySearch(items, target);
        System.out.println("Found " + target + " at index: " + index);
    }
}`,
      output: `Sorted: [11, 12, 22, 25, 64]
Found 22 at index: 2`,
      explanation: 'Binary search operates in O(log N) time by halving the search space. Element 22 is located at index 2 of the sorted array.'
    },
    {
      id: 'arr-util-5',
      title: 'Decode Binary Search Insertion Point',
      problemStatement: `Write a Java program to decode the return value of Arrays.binarySearch for missing elements:
1. Given sorted array: \`int[] sorted = {10, 20, 30, 40, 50};\`.
2. Search for missing value \`25\` using \`Arrays.binarySearch(sorted, 25)\`.
3. Print the raw negative return value.
4. Decode and print the insertion point where 25 belongs using \`-(result + 1)\`.`,
      hint: 'When a key is missing, binarySearch returns -(insertion_point) - 1. Decode it with -(result + 1).',
      solutionCode: `import java.util.Arrays;

public class DecodeInsertionPoint {
    public static void main(String[] args) {
        int[] sorted = {10, 20, 30, 40, 50};
        int missingKey = 25;

        int result = Arrays.binarySearch(sorted, missingKey);
        int insertionPoint = -(result + 1);

        System.out.println("Raw return value: " + result);
        System.out.println("Insertion point for " + missingKey + ": index " + insertionPoint);
    }
}`,
      output: `Raw return value: -3
Insertion point for 25: index 2`,
      explanation: 'The value 25 belongs between 20 (index 1) and 30 (index 2). Thus its insertion point is index 2. The formula -(2) - 1 returns -3.'
    },
    {
      id: 'arr-util-6',
      title: 'Fill Array with Sentinel Values',
      problemStatement: `Write a Java program to initialize arrays in bulk using Arrays.fill:
1. Allocate an integer array of size 7: \`int[] table = new int[7];\`.
2. Fill all elements with \`-1\` using \`Arrays.fill(table, -1)\`.
3. Next, fill range from index 2 to index 5 (exclusive) with \`0\`.
4. Print the array after both fill operations.`,
      hint: 'Arrays.fill(arr, val) sets all elements; Arrays.fill(arr, from, to, val) sets the half-open range [from, to).',
      solutionCode: `import java.util.Arrays;

public class FillArrayDemo {
    public static void main(String[] args) {
        int[] table = new int[7];

        Arrays.fill(table, -1);
        System.out.println("Filled with -1: " + Arrays.toString(table));

        Arrays.fill(table, 2, 5, 0);
        System.out.println("Partial fill 0: " + Arrays.toString(table));
    }
}`,
      output: `Filled with -1: [-1, -1, -1, -1, -1, -1, -1]
Partial fill 0: [-1, -1, 0, 0, 0, -1, -1]`,
      explanation: 'Arrays.fill() is useful for resetting memory or creating memoization tables. The second call updates indices 2, 3, and 4 to 0.'
    },
    {
      id: 'arr-util-7',
      title: 'Clone Array with Arrays.copyOf',
      problemStatement: `Write a Java program to duplicate an array safely using Arrays.copyOf:
1. Initialize \`int[] original = {100, 200, 300};\`.
2. Create an independent copy using \`Arrays.copyOf(original, original.length)\`.
3. Modify the copy: \`copy[0] = 999;\`.
4. Print both arrays to demonstrate that original is unaffected.`,
      hint: 'Arrays.copyOf allocates a new array object on the heap and copies elements over.',
      solutionCode: `import java.util.Arrays;

public class CopyOfDemo {
    public static void main(String[] args) {
        int[] original = {100, 200, 300};
        int[] copy = Arrays.copyOf(original, original.length);

        copy[0] = 999;

        System.out.println("Original: " + Arrays.toString(original));
        System.out.println("Copy:     " + Arrays.toString(copy));
        System.out.println("Are references equal? " + (original == copy));
    }
}`,
      output: `Original: [100, 200, 300]
Copy:     [999, 200, 300]
Are references equal? false`,
      explanation: 'Arrays.copyOf() creates an independent heap object. Modifying the copy leaves the original intact, proving deep element copying.'
    },
    {
      id: 'arr-util-8',
      title: 'Truncate and Expand with Arrays.copyOf',
      problemStatement: `Write a Java program to resize an array using Arrays.copyOf:
1. Initialize \`int[] base = {1, 2, 3, 4, 5};\`.
2. Truncate \`base\` to length 3 using \`Arrays.copyOf(base, 3)\`.
3. Expand \`base\` to length 7 using \`Arrays.copyOf(base, 7)\`.
4. Print both the truncated and expanded arrays.`,
      hint: 'When newLength > original.length, extra slots are filled with default 0s. When newLength < original.length, elements are truncated.',
      solutionCode: `import java.util.Arrays;

public class ResizeWithCopyOf {
    public static void main(String[] args) {
        int[] base = {1, 2, 3, 4, 5};

        int[] truncated = Arrays.copyOf(base, 3);
        int[] expanded = Arrays.copyOf(base, 7);

        System.out.println("Truncated (size 3): " + Arrays.toString(truncated));
        System.out.println("Expanded (size 7):  " + Arrays.toString(expanded));
    }
}`,
      output: `Truncated (size 3): [1, 2, 3]
Expanded (size 7):  [1, 2, 3, 4, 5, 0, 0]`,
      explanation: 'Arrays.copyOf() is the standard way to grow or shrink array capacity in Java. Extra slots automatically receive default values.'
    },
    {
      id: 'arr-util-9',
      title: 'Extract Subarray Slice with Arrays.copyOfRange',
      problemStatement: `Write a Java program to extract a sub-segment of an array using Arrays.copyOfRange:
1. Initialize \`String[] weekdays = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};\`.
2. Extract the midweek days (Tuesday through Thursday: indices 1 to 4 exclusive).
3. Print the extracted subarray.`,
      hint: 'Arrays.copyOfRange(arr, from, to) extracts elements from fromIndex inclusive to toIndex exclusive.',
      solutionCode: `import java.util.Arrays;

public class SubarraySliceDemo {
    public static void main(String[] args) {
        String[] weekdays = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};

        // Extract indices 1, 2, 3 ("Tue", "Wed", "Thu")
        String[] midweek = Arrays.copyOfRange(weekdays, 1, 4);

        System.out.println("Midweek days: " + Arrays.toString(midweek));
    }
}`,
      output: 'Midweek days: [Tue, Wed, Thu]',
      explanation: 'Arrays.copyOfRange() creates a new array of length (to - from) and copies the specified element range.'
    },
    {
      id: 'arr-util-10',
      title: 'Content Equality with Arrays.equals',
      problemStatement: `Write a Java program comparing arrays with == vs Arrays.equals:
1. Declare two distinct arrays with identical contents: \`int[] a = {1, 2, 3};\`, \`int[] b = {1, 2, 3};\`.
2. Compare them using \`a == b\` and print the result.
3. Compare them using \`Arrays.equals(a, b)\` and print the result.
4. Modify \`b[0] = 99;\` and check \`Arrays.equals(a, b)\` again.`,
      hint: '== checks reference equality (memory addresses), while Arrays.equals checks element values.',
      solutionCode: `import java.util.Arrays;

public class ArrayEqualityDemo {
    public static void main(String[] args) {
        int[] a = {1, 2, 3};
        int[] b = {1, 2, 3};

        System.out.println("a == b: " + (a == b));
        System.out.println("Arrays.equals(a, b): " + Arrays.equals(a, b));

        b[0] = 99;
        System.out.println("After mutation, Arrays.equals(a, b): " + Arrays.equals(a, b));
    }
}`,
      output: `a == b: false
Arrays.equals(a, b): true
After mutation, Arrays.equals(a, b): false`,
      explanation: 'Because a and b are distinct objects on the heap, == returns false. Arrays.equals compares lengths and elements sequentially.'
    }
  ],

  // ────────────────────────────────────────────────────────────
  // LESSON 7.4: 2D ARRAYS & MATRIX TRAVERSAL
  // ────────────────────────────────────────────────────────────
  'two-dimensional-arrays-and-matrices': [
    {
      id: 'arr-mat-1',
      title: 'Matrix Declaration and Tabular Grid Printing',
      problemStatement: `Write a Java program to declare a 2D matrix and print it in a formatted tabular grid:
1. Initialize a 3x3 matrix: \`int[][] grid = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\`.
2. Use nested loops to print each element followed by a tab (\\t).
3. Print a newline after each row.`,
      hint: 'Outer loop runs r from 0 to grid.length; inner loop runs c from 0 to grid[r].length.',
      solutionCode: `public class MatrixGridPrint {
    public static void main(String[] args) {
        int[][] grid = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[r].length; c++) {
                System.out.print(grid[r][c] + "\\t");
            }
            System.out.println();
        }
    }
}`,
      output: `1\t2\t3\t
4\t5\t6\t
7\t8\t9\t`,
      explanation: 'Row-major traversal iterates through each row sequentially, printing column values separated by tabs and ending each row with a newline.'
    },
    {
      id: 'arr-mat-2',
      title: 'Sum of Each Row in Matrix',
      problemStatement: `Write a Java program to calculate and display the sum of each row in a matrix:
1. Initialize \`int[][] matrix = {{3, 5, 2}, {8, 1, 4}, {6, 9, 7}};\`.
2. For each row, calculate the sum of its elements.
3. Print \`Row X sum: sum\` for each row.`,
      hint: 'Reset rowSum = 0 at the start of each outer loop iteration.',
      solutionCode: `public class RowSums {
    public static void main(String[] args) {
        int[][] matrix = {
            {3, 5, 2},
            {8, 1, 4},
            {6, 9, 7}
        };

        for (int r = 0; r < matrix.length; r++) {
            int rowSum = 0;
            for (int c = 0; c < matrix[r].length; c++) {
                rowSum += matrix[r][c];
            }
            System.out.println("Row " + r + " sum: " + rowSum);
        }
    }
}`,
      output: `Row 0 sum: 10
Row 1 sum: 13
Row 2 sum: 22`,
      explanation: 'By scoping rowSum inside the outer row loop, each row calculates its own isolated sum.'
    },
    {
      id: 'arr-mat-3',
      title: 'Sum of Each Column in Matrix',
      problemStatement: `Write a Java program to compute the sum of each column in a rectangular matrix:
1. Initialize a 2x3 matrix: \`int[][] grid = {{2, 5, 8}, {3, 4, 1}};\`.
2. Determine row count (\`grid.length\`) and column count (\`grid[0].length\`).
3. Iterate columns in the outer loop and rows in the inner loop: \`grid[r][c]\`.
4. Print \`Col X sum: sum\` for each column.`,
      hint: 'Outer loop runs c from 0 to cols - 1; inner loop runs r from 0 to rows - 1.',
      solutionCode: `public class ColumnSums {
    public static void main(String[] args) {
        int[][] grid = {
            {2, 5, 8},
            {3, 4, 1}
        };

        int rows = grid.length;
        int cols = grid[0].length;

        for (int c = 0; c < cols; c++) {
            int colSum = 0;
            for (int r = 0; r < rows; r++) {
                colSum += grid[r][c];
            }
            System.out.println("Col " + c + " sum: " + colSum);
        }
    }
}`,
      output: `Col 0 sum: 5
Col 1 sum: 9
Col 2 sum: 9`,
      explanation: 'Column-major traversal fixes the column index c in the outer loop while stepping through rows r in the inner loop.'
    },
    {
      id: 'arr-mat-4',
      title: 'Primary and Secondary Diagonal Sums',
      problemStatement: `Write a Java program to compute both diagonal sums of an N x N square matrix in a single pass:
1. Initialize a 3x3 matrix: \`int[][] mat = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\`.
2. Compute the primary diagonal sum using \`mat[i][i]\`.
3. Compute the secondary diagonal sum using \`mat[i][n - 1 - i]\`.
4. Print both sums.`,
      hint: 'Use a single loop from i = 0 to n - 1, accumulating mat[i][i] and mat[i][n - 1 - i].',
      solutionCode: `public class DiagonalSums {
    public static void main(String[] args) {
        int[][] mat = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        int n = mat.length;
        int primarySum = 0;
        int secondarySum = 0;

        for (int i = 0; i < n; i++) {
            primarySum += mat[i][i];
            secondarySum += mat[i][n - 1 - i];
        }

        System.out.println("Primary Diagonal Sum:   " + primarySum);
        System.out.println("Secondary Diagonal Sum: " + secondarySum);
    }
}`,
      output: `Primary Diagonal Sum:   15
Secondary Diagonal Sum: 15`,
      explanation: 'Primary diagonal elements are (0,0)=1, (1,1)=5, (2,2)=9 (sum = 15). Secondary diagonal elements are (0,2)=3, (1,1)=5, (2,0)=7 (sum = 15). Both are computed in O(N) time.'
    },
    {
      id: 'arr-mat-5',
      title: 'Find Maximum Value and Coordinates in Matrix',
      problemStatement: `Write a Java program to find the largest value in a 2D matrix along with its row and column coordinates:
1. Initialize \`int[][] data = {{14, 72, 38}, {85, 29, 93}, {44, 61, 56}};\`.
2. Initialize \`max = data[0][0]\`, \`maxRow = 0\`, and \`maxCol = 0\`.
3. Traverse the matrix, updating the max value and its (row, col) coordinates when a larger element is found.
4. Print the maximum value and its coordinates.`,
      hint: 'Keep track of maxRow and maxCol whenever data[r][c] > max.',
      solutionCode: `public class MatrixMaxFinder {
    public static void main(String[] args) {
        int[][] data = {
            {14, 72, 38},
            {85, 29, 93},
            {44, 61, 56}
        };

        int max = data[0][0];
        int maxRow = 0;
        int maxCol = 0;

        for (int r = 0; r < data.length; r++) {
            for (int c = 0; c < data[r].length; c++) {
                if (data[r][c] > max) {
                    max = data[r][c];
                    maxRow = r;
                    maxCol = c;
                }
            }
        }

        System.out.println("Maximum Value: " + max);
        System.out.println("Located at: Row " + maxRow + ", Column " + maxCol);
    }
}`,
      output: `Maximum Value: 93
Located at: Row 1, Column 2`,
      explanation: 'Traversing the matrix checks all elements. Value 93 at index [1][2] is identified as the maximum.'
    },
    {
      id: 'arr-mat-6',
      title: 'Matrix Transposition',
      problemStatement: `Write a Java program to transpose an M x N matrix into an N x M matrix:
1. Initialize a 2x3 matrix: \`int[][] original = {{1, 2, 3}, {4, 5, 6}};\`.
2. Create \`int[][] transposed = new int[cols][rows];\` (3x2).
3. Populate \`transposed[c][r] = original[r][c]\`.
4. Print both matrices using nested loops.`,
      hint: 'Rows of original become columns of transposed: transposed[c][r] = original[r][c].',
      solutionCode: `public class MatrixTranspose {
    public static void main(String[] args) {
        int[][] original = {
            {1, 2, 3},
            {4, 5, 6}
        };

        int rows = original.length;
        int cols = original[0].length;
        int[][] transposed = new int[cols][rows];

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                transposed[c][r] = original[r][c];
            }
        }

        System.out.println("Transposed Matrix (3x2):");
        for (int r = 0; r < transposed.length; r++) {
            for (int c = 0; c < transposed[r].length; c++) {
                System.out.print(transposed[r][c] + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `Transposed Matrix (3x2):
1 4 
2 5 
3 6 `,
      explanation: 'A 2x3 matrix with rows [1, 2, 3] and [4, 5, 6] transposes into a 3x2 matrix with rows [1, 4], [2, 5], and [3, 6].'
    },
    {
      id: 'arr-mat-7',
      title: 'Check for Matrix Symmetry',
      problemStatement: `Write a Java program to check whether a square matrix is symmetric (equal to its transpose):
1. Initialize \`int[][] matrix = {{1, 7, 3}, {7, 4, -5}, {3, -5, 6}};\`.
2. A matrix is symmetric if \`matrix[r][c] == matrix[c][r]\` for all indices.
3. Check only the upper triangle (\`c > r\`) for efficiency.
4. Print whether the matrix is symmetric.`,
      hint: 'Loop r from 0 to n - 1, and c from r + 1 to n - 1. If matrix[r][c] != matrix[c][r], set flag to false and break.',
      solutionCode: `public class SymmetricMatrixCheck {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 7, 3},
            {7, 4, -5},
            {3, -5, 6}
        };

        boolean isSymmetric = true;
        int n = matrix.length;

        for (int r = 0; r < n; r++) {
            for (int c = r + 1; c < n; c++) {
                if (matrix[r][c] != matrix[c][r]) {
                    isSymmetric = false;
                    break;
                }
            }
            if (!isSymmetric) break;
        }

        System.out.println("Is symmetric: " + isSymmetric);
    }
}`,
      output: 'Is symmetric: true',
      explanation: 'Comparing matrix[r][c] with matrix[c][r] for c > r checks all off-diagonal pairs once. Since all pairs match, the matrix is symmetric.'
    },
    {
      id: 'arr-mat-8',
      title: 'Construct and Traverse Jagged Array',
      problemStatement: `Write a Java program to construct and populate a jagged array:
1. Allocate an outer array with 4 rows: \`int[][] jagged = new int[4][];\`.
2. For each row \`i\`, allocate an array of size \`i + 1\`.
3. Populate each element \`jagged[i][j]\` with \`(j + 1) * 10\`.
4. Print the jagged array line by line.`,
      hint: 'In a loop for i from 0 to 3, set jagged[i] = new int[i + 1]. Then populate with inner loop.',
      solutionCode: `public class JaggedArrayDemo {
    public static void main(String[] args) {
        int[][] jagged = new int[4][];

        for (int i = 0; i < jagged.length; i++) {
            jagged[i] = new int[i + 1];
            for (int j = 0; j < jagged[i].length; j++) {
                jagged[i][j] = (j + 1) * 10;
            }
        }

        for (int i = 0; i < jagged.length; i++) {
            for (int j = 0; j < jagged[i].length; j++) {
                System.out.print(jagged[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `10 
10 20 
10 20 30 
10 20 30 40 `,
      explanation: 'Because rows in Java are independent heap objects, each row can have a unique length. Row 0 has 1 element, row 1 has 2, row 2 has 3, and row 3 has 4.'
    },
    {
      id: 'arr-mat-9',
      title: 'Matrix Scalar Multiplication',
      problemStatement: `Write a Java program to perform scalar multiplication on a 2D matrix in-place:
1. Initialize \`int[][] matrix = {{1, 2, 3}, {4, 5, 6}};\`.
2. Define a scalar multiplier: \`int factor = 3;\`.
3. Multiply every element in the matrix by \`factor\`.
4. Print the updated matrix.`,
      hint: 'In nested loops, update matrix[r][c] = matrix[r][c] * factor.',
      solutionCode: `public class ScalarMultiplication {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };
        int factor = 3;

        for (int r = 0; r < matrix.length; r++) {
            for (int c = 0; c < matrix[r].length; c++) {
                matrix[r][c] *= factor;
            }
        }

        System.out.println("Scaled Matrix:");
        for (int r = 0; r < matrix.length; r++) {
            for (int c = 0; c < matrix[r].length; c++) {
                System.out.print(matrix[r][c] + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `Scaled Matrix:
3 6 9 
12 15 18 `,
      explanation: 'Scalar multiplication mutates every element by multiplying with factor in-place, preserving matrix structure.'
    },
    {
      id: 'arr-mat-10',
      title: 'Print Matrix using Arrays.deepToString',
      problemStatement: `Write a Java program demonstrating multi-dimensional array printing:
1. Initialize a 2D matrix: \`int[][] grid = {{10, 20}, {30, 40}, {50, 60}};\`.
2. Print the matrix using \`Arrays.deepToString(grid)\`.
3. Modify \`grid[1][1] = 999;\` and print again.`,
      hint: 'Arrays.deepToString() recursively traverses nested sub-arrays to print clean formatted strings.',
      solutionCode: `import java.util.Arrays;

public class DeepToStringDemo {
    public static void main(String[] args) {
        int[][] grid = {
            {10, 20},
            {30, 40},
            {50, 60}
        };

        System.out.println("Initial:  " + Arrays.deepToString(grid));

        grid[1][1] = 999;
        System.out.println("Modified: " + Arrays.deepToString(grid));
    }
}`,
      output: `Initial:  [[10, 20], [30, 40], [50, 60]]
Modified: [[10, 20], [30, 999], [50, 60]]`,
      explanation: 'Arrays.deepToString() handles multi-dimensional arrays, formatting each inner array recursively with brackets and comma separation.'
    }
  ]
};
