import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 22: JAVA 8+ STREAMS & LAMBDAS (40 EXERCISES)
// 10 Exercises per sub-lesson across Lessons 22.1 - 22.4
// Authoritative FAANG-Standard Java Functional Programming Curriculum
// ============================================================

export const streams22Exercises: Record<string, ProgrammingExercise[]> = {
  // ── LESSON 22.1: Lambdas and Functional Interfaces ────────────────────────
  'lambdas-and-functional-interfaces': [
    {
      id: 'ex-22-1-ex1',
      title: 'User Authentication Filter with Predicate Chaining',
      problemStatement: `Implement a user access verification filter using \`Predicate\` composition. Filter a list of user accounts to find users who satisfy authentication rules: active status (\`isActive\`), verified email (\`isEmailVerified\`), and having either \`ADMIN\` or \`MODERATOR\` role, while negating accounts that are flagged for suspicious activity (\`isFlagged\`).`,
      hint: `Combine standard \`Predicate<T>\` objects using \`and()\`, \`or()\`, and \`negate()\`.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class Main {
    static class User {
        private final String username;
        private final String role;
        private final boolean active;
        private final boolean emailVerified;
        private final boolean flagged;

        public User(String username, String role, boolean active, boolean emailVerified, boolean flagged) {
            this.username = username;
            this.role = role;
            this.active = active;
            this.emailVerified = emailVerified;
            this.flagged = flagged;
        }

        public String getUsername() { return username; }
        public String getRole() { return role; }
        public boolean isActive() { return active; }
        public boolean isEmailVerified() { return emailVerified; }
        public boolean isFlagged() { return flagged; }

        @Override
        public String toString() { return username + " (" + role + ")"; }
    }

    public static void main(String[] args) {
        List<User> users = Arrays.asList(
            new User("alice", "ADMIN", true, true, false),
            new User("bob", "MODERATOR", true, true, true),
            new User("charlie", "USER", true, true, false),
            new User("dave", "MODERATOR", true, true, false),
            new User("eve", "ADMIN", false, true, false)
        );

        Predicate<User> isActive = User::isActive;
        Predicate<User> isVerified = User::isEmailVerified;
        Predicate<User> isAdmin = u -> "ADMIN".equals(u.getRole());
        Predicate<User> isModerator = u -> "MODERATOR".equals(u.getRole());
        Predicate<User> isFlagged = User::isFlagged;

        Predicate<User> canAccessAdminPortal = isActive
            .and(isVerified)
            .and(isAdmin.or(isModerator))
            .and(isFlagged.negate());

        List<User> authorizedUsers = users.stream()
            .filter(canAccessAdminPortal)
            .collect(Collectors.toList());

        System.out.println("Authorized portal users:");
        authorizedUsers.forEach(u -> System.out.println("- " + u));
    }
}`,
      output: `Authorized portal users:
- alice (ADMIN)
- dave (MODERATOR)`,
      explanation: `Predicate composition in Java 8 allows complex conditional business logic to be assembled declaratively using default methods \`and()\`, \`or()\`, and \`negate()\`. This separates individual validation rules into reusable, testable functional components and eliminates deeply nested if-else ladders.`
    },
    {
      id: 'ex-22-1-ex2',
      title: 'Financial Pricing Pipeline with Function Composition',
      problemStatement: `Construct an invoice pricing pipeline using \`Function.andThen()\` and \`Function.compose()\`. Apply a percentage discount (10% off), add a flat shipping and handling fee ($5.00), calculate regional sales tax (8%), and format the final amount into a currency string. Contrast the execution sequence of \`andThen\` versus \`compose\`.`,
      hint: `Use \`Function<Double, Double>\` combined with \`andThen()\` for forward chaining and \`compose()\` for reverse precedence.`,
      solutionCode: `import java.util.Locale;
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<Double, Double> applyDiscount = price -> price * 0.90; // 10% discount
        Function<Double, Double> addShipping = price -> price + 5.00;    // $5.00 shipping
        Function<Double, Double> applyTax = price -> price * 1.08;       // 8% tax
        Function<Double, String> formatCurrency = amount -> String.format(Locale.US, "$%.2f", amount);

        // Chaining with andThen: discount -> shipping -> tax -> format
        Function<Double, String> checkoutPipeline = applyDiscount
            .andThen(addShipping)
            .andThen(applyTax)
            .andThen(formatCurrency);

        // Demonstrating compose: f.compose(g) executes g first, then f
        Function<Double, Double> taxAfterShipping = applyTax.compose(addShipping);

        double basePrice1 = 100.00;
        double basePrice2 = 250.00;

        System.out.println("Tax on ($100 + shipping): " + String.format(Locale.US, "$%.2f", taxAfterShipping.apply(basePrice1)));
        System.out.println("Final total for $" + String.format(Locale.US, "%.2f", basePrice1) + ": " + checkoutPipeline.apply(basePrice1));
        System.out.println("Final total for $" + String.format(Locale.US, "%.2f", basePrice2) + ": " + checkoutPipeline.apply(basePrice2));
    }
}`,
      output: `Tax on ($100 + shipping): $113.40
Final total for $100.00: $102.60
Final total for $250.00: $248.40`,
      explanation: `\`Function.andThen(after)\` applies the current function first and feeds its result into \`after\`. In contrast, \`Function.compose(before)\` executes \`before\` first and passes the output to the calling function. Combining small, single-purpose transformations creates highly readable and maintainable processing pipelines.`
    },
    {
      id: 'ex-22-1-ex3',
      title: 'Zero-Allocation Telemetry Filtering with Primitive Functional Interfaces',
      problemStatement: `Filter high-throughput sensor telemetry readings without heap overhead from object autoboxing. Use primitive specialized functional interfaces \`IntPredicate\` and \`LongUnaryOperator\` to filter raw integer sensor values and transform timestamps from nanoseconds to microseconds with a calibration offset.`,
      hint: `Use \`java.util.function.IntPredicate\` and \`java.util.function.LongUnaryOperator\` instead of boxed \`Predicate<Integer>\` or \`Function<Long, Long>\`.`,
      solutionCode: `import java.util.function.IntPredicate;
import java.util.function.LongUnaryOperator;

public class Main {
    public static void main(String[] args) {
        int[] sensorReadings = {45, 102, 18, 77, 210, 89, 95, 140};

        IntPredicate isWithinRange = val -> val >= 50 && val <= 150;
        IntPredicate isEven = val -> val % 2 == 0;
        IntPredicate validOddReadings = isWithinRange.and(isEven.negate());

        System.out.println("Filtered sensor readings (odd in [50, 150]):");
        for (int reading : sensorReadings) {
            if (validOddReadings.test(reading)) {
                System.out.println("- Reading: " + reading);
            }
        }

        LongUnaryOperator nanosToMicros = ns -> ns / 1_000L;
        LongUnaryOperator addCalibrationOffset = us -> us + 15L;
        LongUnaryOperator telemetryTimer = nanosToMicros.andThen(addCalibrationOffset);

        long[] timestampsNs = {1_000_000L, 5_500_000L, 12_800_000L};
        System.out.println("Calibrated timestamps (microseconds):");
        for (long ns : timestampsNs) {
            System.out.println("- Raw: " + ns + " ns -> Calibrated: " + telemetryTimer.applyAsLong(ns) + " us");
        }
    }
}`,
      output: `Filtered sensor readings (odd in [50, 150]):
- Reading: 77
- Reading: 89
- Reading: 95
Calibrated timestamps (microseconds):
- Raw: 1000000 ns -> Calibrated: 1015 us
- Raw: 5500000 ns -> Calibrated: 5515 us
- Raw: 12800000 ns -> Calibrated: 12815 us`,
      explanation: `Java standard functional interfaces like \`Predicate<Integer>\` box primitive types into heap objects (\`java.lang.Integer\`), producing GC pressure in high-throughput low-latency systems. Specialized primitive interfaces (\`IntPredicate\`, \`LongUnaryOperator\`, \`DoubleConsumer\`) work directly with native JVM primitive types, eliminating boxing and unboxing penalties.`
    },
    {
      id: 'ex-22-1-ex4',
      title: 'Multi-Currency Converter and Aggregator with BiFunction and BinaryOperator',
      problemStatement: `Build a financial portfolio aggregator that converts transaction amounts between foreign currencies into USD using \`BiFunction<Double, Double, Double>\` (amount and exchange rate) and aggregates totals across accounts using \`BinaryOperator<Double>\`. Also use \`BinaryOperator.maxBy\` to identify the single largest converted transaction.`,
      hint: `Utilize \`BiFunction<T, U, R>\` for operations with two different argument types and \`BinaryOperator<T>\` when arguments and result share the same type.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.function.BiFunction;
import java.util.function.BinaryOperator;

public class Main {
    static class CurrencyEntry {
        private final String currency;
        private final double amount;
        private final double exchangeRateToUsd;

        public CurrencyEntry(String currency, double amount, double exchangeRateToUsd) {
            this.currency = currency;
            this.amount = amount;
            this.exchangeRateToUsd = exchangeRateToUsd;
        }

        public String getCurrency() { return currency; }
        public double getAmount() { return amount; }
        public double getExchangeRateToUsd() { return exchangeRateToUsd; }
    }

    public static void main(String[] args) {
        List<CurrencyEntry> entries = Arrays.asList(
            new CurrencyEntry("EUR", 1000.0, 1.08),
            new CurrencyEntry("GBP", 500.0, 1.25),
            new CurrencyEntry("JPY", 150000.0, 0.0067)
        );

        BiFunction<Double, Double, Double> fxConverter = (amount, rate) -> amount * rate;
        BinaryOperator<Double> balanceAggregator = (acc, val) -> acc + val;
        BinaryOperator<Double> maxTransaction = BinaryOperator.maxBy(Double::compare);

        double totalUsd = 0.0;
        double maxSingleUsd = 0.0;

        for (CurrencyEntry entry : entries) {
            double converted = fxConverter.apply(entry.getAmount(), entry.getExchangeRateToUsd());
            System.out.printf(Locale.US, "Converted %s %.2f -> USD $%.2f%n",
                entry.getCurrency(), entry.getAmount(), converted);
            totalUsd = balanceAggregator.apply(totalUsd, converted);
            maxSingleUsd = maxTransaction.apply(maxSingleUsd, converted);
        }

        System.out.printf(Locale.US, "Total Portfolio Value: USD $%.2f%n", totalUsd);
        System.out.printf(Locale.US, "Largest Single Asset: USD $%.2f%n", maxSingleUsd);
    }
}`,
      output: `Converted EUR 1000.00 -> USD $1080.00
Converted GBP 500.00 -> USD $625.00
Converted JPY 150000.00 -> USD $1005.00
Total Portfolio Value: USD $2710.00
Largest Single Asset: USD $1080.00`,
      explanation: `\`BiFunction<T, U, R>\` generalizes two-argument mappings where types can vary. \`BinaryOperator<T>\` is a specialization of \`BiFunction<T, T, T>\` where both inputs and the result share the exact same type, making it the canonical functional interface for accumulators and reductions, as demonstrated with \`BinaryOperator.maxBy\`.`
    },
    {
      id: 'ex-22-1-ex5',
      title: 'Data Sanitization with Static and Bound Instance Method References',
      problemStatement: `Implement an enterprise payload sanitizer that cleanses incoming user registration fields. Use static method references (\`DataSanitizer::trimAndNormalize\`) for stateless string normalization and bound instance method references (\`tenantPrefixer::prependTenantTag\`) for stateful tenant tagging.`,
      hint: `Static method reference syntax is \`ContainingClass::staticMethodName\`; bound instance method reference is \`instanceRef::methodName\`.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

public class Main {
    static class DataSanitizer {
        public static String trimAndNormalize(String input) {
            return input == null ? "" : input.trim().toLowerCase();
        }
    }

    static class TenantPrefixer {
        private final String tenantId;

        public TenantPrefixer(String tenantId) {
            this.tenantId = tenantId;
        }

        public String prependTenantTag(String value) {
            return "[" + tenantId + "] " + value;
        }
    }

    public static void main(String[] args) {
        List<String> rawUsernames = Arrays.asList("  AliceSmith  ", " BOB_JONES ", "  charlie.brown  ");

        // Static method reference
        Function<String, String> normalizer = DataSanitizer::trimAndNormalize;

        // Bound instance method reference
        TenantPrefixer tenantPrefixer = new TenantPrefixer("CORP-US");
        Function<String, String> tagger = tenantPrefixer::prependTenantTag;

        // Composed pipeline: normalize then tag
        Function<String, String> sanitizeAndTag = normalizer.andThen(tagger);

        System.out.println("Sanitized and tagged user records:");
        for (String raw : rawUsernames) {
            String processed = sanitizeAndTag.apply(raw);
            System.out.println(processed);
        }
    }
}`,
      output: `Sanitized and tagged user records:
[CORP-US] alicesmith
[CORP-US] bob_jones
[CORP-US] charlie.brown`,
      explanation: `Method references are syntactic shortcuts for lambdas that directly invoke an existing method. A static method reference \`ClassName::staticMethod\` matches \`(args) -> ClassName.staticMethod(args)\`. A bound instance method reference \`instance::instanceMethod\` captures a pre-existing target instance and delegates calls to \`(args) -> instance.instanceMethod(args)\`.`
    },
    {
      id: 'ex-22-1-ex6',
      title: 'Unbound Method References for Flexible Sorting',
      problemStatement: `Sort a product catalog using unbound method references. Contrast how the unbound method reference \`String::compareToIgnoreCase\` fulfills \`Comparator<String>\` where the first parameter is the invocation target, and use \`Product::getPrice\` with \`Comparator.comparingDouble()\` to sort domain entities.`,
      hint: `An unbound method reference \`Class::instanceMethod\` implicitly takes the first parameter as the target object invocation receiver.`,
      solutionCode: `import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Main {
    static class Product {
        private final String sku;
        private final double price;

        public Product(String sku, double price) {
            this.sku = sku;
            this.price = price;
        }

        public String getSku() { return sku; }
        public double getPrice() { return price; }

        @Override
        public String toString() { return sku + " ($" + price + ")"; }
    }

    public static void main(String[] args) {
        List<String> rawCodes = Arrays.asList("delta-9", "Alpha-1", "beta-3", "ALPHA-2", "Beta-1");

        // Unbound method reference String::compareToIgnoreCase: (s1, s2) -> s1.compareToIgnoreCase(s2)
        Comparator<String> caseInsensitive = String::compareToIgnoreCase;
        rawCodes.sort(caseInsensitive);
        System.out.println("Sorted product codes: " + rawCodes);

        List<Product> products = Arrays.asList(
            new Product("Laptop", 1299.99),
            new Product("Mouse", 25.50),
            new Product("Keyboard", 75.00),
            new Product("Monitor", 349.99)
        );

        // Unbound method reference Product::getPrice: (p) -> p.getPrice()
        products.sort(Comparator.comparingDouble(Product::getPrice));
        System.out.println("Products sorted by price ascending:");
        products.forEach(p -> System.out.println("- " + p));
    }
}`,
      output: `Sorted product codes: [Alpha-1, ALPHA-2, Beta-1, beta-3, delta-9]
Products sorted by price ascending:
- Mouse ($25.5)
- Keyboard ($75.0)
- Monitor ($349.99)
- Laptop ($1299.99)`,
      explanation: `In an unbound instance method reference \`ClassName::instanceMethod\`, no instance is captured beforehand. Instead, the first argument supplied at runtime becomes the receiver on which the method is called. For instance, \`String::compareToIgnoreCase\` matches \`(s1, s2) -> s1.compareToIgnoreCase(s2)\` perfectly satisfying \`Comparator<String>\`.`
    },
    {
      id: 'ex-22-1-ex7',
      title: 'Configurable Entity Factory with Constructor References',
      problemStatement: `Develop a dynamic cloud resource factory utilizing constructor references. Use \`Supplier<T>\` for no-arg constructor instantiation of a default instance and \`BiFunction<T, U, R>\` for parameterized constructor instantiation of \`VirtualMachine\` instances.`,
      hint: `A constructor reference uses the syntax \`ClassName::new\` matching functional interface signatures like \`Supplier<R>\` or \`BiFunction<T, U, R>\`.`,
      solutionCode: `import java.util.function.BiFunction;
import java.util.function.Supplier;

public class Main {
    static class VirtualMachine {
        private final String instanceType;
        private final int cpuCores;
        private final int ramGb;

        // Default no-arg constructor
        public VirtualMachine() {
            this.instanceType = "standard-t2.micro";
            this.cpuCores = 1;
            this.ramGb = 1;
        }

        // Parameterized constructor
        public VirtualMachine(String instanceType, int cpuCores) {
            this.instanceType = instanceType;
            this.cpuCores = cpuCores;
            this.ramGb = cpuCores * 4;
        }

        @Override
        public String toString() {
            return String.format("VM[type=%s, vCPU=%d, RAM=%dGB]", instanceType, cpuCores, ramGb);
        }
    }

    public static void main(String[] args) {
        // Constructor reference for Supplier (no-arg)
        Supplier<VirtualMachine> defaultVmFactory = VirtualMachine::new;

        // Constructor reference for BiFunction (2-arg)
        BiFunction<String, Integer, VirtualMachine> customVmFactory = VirtualMachine::new;

        VirtualMachine defaultVm = defaultVmFactory.get();
        VirtualMachine computeVm = customVmFactory.apply("c5.xlarge", 4);
        VirtualMachine highMemVm = customVmFactory.apply("r5.2xlarge", 8);

        System.out.println("Default VM: " + defaultVm);
        System.out.println("Compute VM: " + computeVm);
        System.out.println("High-Memory VM: " + highMemVm);
    }
}`,
      output: `Default VM: VM[type=standard-t2.micro, vCPU=1, RAM=1GB]
Compute VM: VM[type=c5.xlarge, vCPU=4, RAM=16GB]
High-Memory VM: VM[type=r5.2xlarge, vCPU=8, RAM=32GB]`,
      explanation: `Constructor references use the \`ClassName::new\` syntax and bind to constructor overloads that match the target functional interface signature. A zero-argument constructor matches \`Supplier<T>\`, a single-argument constructor matches \`Function<T, R>\`, and a two-argument constructor matches \`BiFunction<T, U, R>\`, enabling lightweight dependency injection and entity factories.`
    },
    {
      id: 'ex-22-1-ex8',
      title: 'Checked Exception Handling with Functional Try-Catch Wrapper',
      problemStatement: `Java standard \`Function<T, R>\` does not allow throwing checked exceptions, forcing verbose try-catch blocks inside lambdas. Define a custom \`@FunctionalInterface\` \`ThrowingFunction<T, R, E extends Exception>\` and a higher-order wrapper method \`unchecked(...)\` that converts checked exceptions into unchecked \`RuntimeException\` or provides safe fallback parsing.`,
      hint: `Define \`@FunctionalInterface interface ThrowingFunction<T, R, E extends Exception> { R apply(T t) throws E; }\` and wrap it in a standard \`Function<T, R>\`.`,
      solutionCode: `import java.net.URI;
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

public class Main {
    @FunctionalInterface
    interface ThrowingFunction<T, R, E extends Exception> {
        R apply(T t) throws E;
    }

    static <T, R> Function<T, R> unchecked(ThrowingFunction<T, R, Exception> f) {
        return t -> {
            try {
                return f.apply(t);
            } catch (Exception ex) {
                throw new RuntimeException("Functional execution error: " + ex.getMessage(), ex);
            }
        };
    }

    static <T, R> Function<T, R> withFallback(ThrowingFunction<T, R, Exception> f, R fallback) {
        return t -> {
            try {
                return f.apply(t);
            } catch (Exception ex) {
                return fallback;
            }
        };
    }

    public static void main(String[] args) {
        List<String> rawUris = Arrays.asList(
            "https://api.github.com",
            "https://invalid url with spaces.com",
            "urn:isbn:0451450523"
        );

        // Safe fallback wrapper
        Function<String, URI> safeParser = withFallback(URI::new, URI.create("http://fallback.local"));

        System.out.println("Parsing URIs with fallback wrapper:");
        for (String raw : rawUris) {
            URI uri = safeParser.apply(raw);
            System.out.println(raw + " -> " + uri);
        }

        // Unchecked wrapper test
        try {
            Function<String, URI> strictParser = unchecked(URI::new);
            strictParser.apply("bad uri: //broken");
        } catch (RuntimeException ex) {
            System.out.println("Caught wrapped runtime exception: " + ex.getMessage());
        }
    }
}`,
      output: `Parsing URIs with fallback wrapper:
https://api.github.com -> https://api.github.com
https://invalid url with spaces.com -> http://fallback.local
urn:isbn:0451450523 -> urn:isbn:0451450523
Caught wrapped runtime exception: Functional execution error: Illegal character in scheme name at index 3: bad uri: //broken`,
      explanation: `Standard Java functional interfaces lack \`throws\` clauses, making checked exceptions cumbersome in lambda expressions. Higher-order functions like \`unchecked()\` and \`withFallback()\` wrap a custom \`@FunctionalInterface\` containing a \`throws\` clause, transforming checked exceptions into unchecked \`RuntimeException\`s or providing default recovery values cleanly.`
    },
    {
      id: 'ex-22-1-ex9',
      title: 'Effectively Final Variable Capture and Atomic State Accumulator',
      problemStatement: `Demonstrate the Java closure rules regarding variable capture (effectively final local variables vs heap-allocated mutable references). Build a safe metrics accumulator within a functional stream using \`AtomicInteger\` to tally processed events without mutating local primitives.`,
      hint: `Local variables referenced inside a lambda must be effectively final. To accumulate mutable state, capture a thread-safe container reference like \`AtomicInteger\`.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) {
        List<String> transactions = Arrays.asList(
            "TXN-101:SUCCESS",
            "TXN-102:FAILURE",
            "TXN-103:SUCCESS",
            "TXN-104:SUCCESS",
            "TXN-105:FAILURE"
        );

        // Effectively final variable captured by lambda (read-only)
        final String successMarker = "SUCCESS";

        // Heap-allocated thread-safe state container captured by lambda
        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger failureCount = new AtomicInteger(0);

        transactions.forEach(txn -> {
            if (txn.contains(successMarker)) {
                successCount.incrementAndGet();
            } else {
                failureCount.incrementAndGet();
            }
        });

        System.out.println("Audit Processing Complete:");
        System.out.println("- Total transactions: " + transactions.size());
        System.out.println("- Successful: " + successCount.get());
        System.out.println("- Failed: " + failureCount.get());
    }
}`,
      output: `Audit Processing Complete:
- Total transactions: 5
- Successful: 3
- Failed: 2`,
      explanation: `Java closures capture values, not variables. To prevent stack memory concurrency bugs, local variables referenced inside lambdas must be final or effectively final (never reassigned). If state accumulation across lambda iterations is required, an object reference (such as \`AtomicInteger\`) whose reference remains effectively final while its internal state mutates must be captured.`
    },
    {
      id: 'ex-22-1-ex10',
      title: 'Multi-Strategy Sorting Engine with Comparator Chaining',
      problemStatement: `Construct a multi-tiered sorting engine for airline flight bookings. Sort flights first by status (Active before Cancelled), then by departure city alphabetically, then by price ascending, and finally by available seats descending using \`Comparator.comparing()\`, \`thenComparing()\`, and \`thenComparingInt()\`.`,
      hint: `Chain \`Comparator.comparing(...).thenComparing(...).thenComparing(..., Comparator.reverseOrder())\`.`,
      solutionCode: `import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

public class Main {
    static class Flight {
        private final String code;
        private final String status; // "ACTIVE", "CANCELLED"
        private final String departureCity;
        private final double price;
        private final int availableSeats;

        public Flight(String code, String status, String departureCity, double price, int availableSeats) {
            this.code = code;
            this.status = status;
            this.departureCity = departureCity;
            this.price = price;
            this.availableSeats = availableSeats;
        }

        public String getCode() { return code; }
        public String getStatus() { return status; }
        public String getDepartureCity() { return departureCity; }
        public double getPrice() { return price; }
        public int getAvailableSeats() { return availableSeats; }

        @Override
        public String toString() {
            return String.format(Locale.US, "%-8s [%-9s] %-12s $%-7.2f Seats: %d",
                code, status, departureCity, price, availableSeats);
        }
    }

    public static void main(String[] args) {
        List<Flight> flights = Arrays.asList(
            new Flight("AA101", "CANCELLED", "Chicago", 220.00, 15),
            new Flight("DL204", "ACTIVE", "New York", 350.00, 8),
            new Flight("UA505", "ACTIVE", "Chicago", 220.00, 25),
            new Flight("DL209", "ACTIVE", "New York", 310.00, 4),
            new Flight("SW331", "ACTIVE", "Chicago", 220.00, 12),
            new Flight("UA999", "CANCELLED", "Boston", 180.00, 0)
        );

        Comparator<Flight> flightComparator = Comparator
            .comparing(Flight::getStatus) // "ACTIVE" comes before "CANCELLED"
            .thenComparing(Flight::getDepartureCity)
            .thenComparingDouble(Flight::getPrice)
            .thenComparing(Comparator.comparingInt(Flight::getAvailableSeats).reversed());

        flights.sort(flightComparator);

        System.out.println("Sorted Flight Schedule:");
        flights.forEach(System.out::println);
    }
}`,
      output: `Sorted Flight Schedule:
UA505    [ACTIVE   ] Chicago      $220.00  Seats: 25
SW331    [ACTIVE   ] Chicago      $220.00  Seats: 12
DL209    [ACTIVE   ] New York     $310.00  Seats: 4
DL204    [ACTIVE   ] New York     $350.00  Seats: 8
UA999    [CANCELLED] Boston       $180.00  Seats: 0
AA101    [CANCELLED] Chicago      $220.00  Seats: 15`,
      explanation: `\`Comparator\` static and default methods (\`comparing()\`, \`thenComparing()\`, \`thenComparingDouble()\`, \`reversed()\`) enable declarative multi-level sorting hierarchies without writing cumbersome nested if/else comparisons. The pipeline evaluates criteria sequentially, breaking ties with subsequent comparators.`
    }
  ],

  // ── LESSON 22.2: Stream Pipeline and Intermediate Operations ──────────────
  'stream-pipeline-intermediate-operations': [
    {
      id: 'ex-22-2-ex1',
      title: 'Filtering and Mapping E-Commerce Transaction Logs',
      problemStatement: `Process a stream of e-commerce payment transactions. Filter transactions to isolate completed credit card payments exceeding $100.00, map them to audit summary tokens (\`TXN-[ID]:$[AMOUNT]\`), and collect them into a formatted list.`,
      hint: `Use \`.filter()\` with combined conditions followed by \`.map()\` to project domain objects into transformed strings.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

public class Main {
    static class Transaction {
        private final String id;
        private final String paymentType;
        private final String status;
        private final double amount;

        public Transaction(String id, String paymentType, String status, double amount) {
            this.id = id;
            this.paymentType = paymentType;
            this.status = status;
            this.amount = amount;
        }

        public String getId() { return id; }
        public String getPaymentType() { return paymentType; }
        public String getStatus() { return status; }
        public double getAmount() { return amount; }
    }

    public static void main(String[] args) {
        List<Transaction> transactions = Arrays.asList(
            new Transaction("1001", "CREDIT_CARD", "COMPLETED", 154.50),
            new Transaction("1002", "PAYPAL", "COMPLETED", 230.00),
            new Transaction("1003", "CREDIT_CARD", "FAILED", 450.00),
            new Transaction("1004", "CREDIT_CARD", "COMPLETED", 75.20),
            new Transaction("1005", "CREDIT_CARD", "COMPLETED", 899.99)
        );

        List<String> auditLogs = transactions.stream()
            .filter(t -> "COMPLETED".equals(t.getStatus()))
            .filter(t -> "CREDIT_CARD".equals(t.getPaymentType()))
            .filter(t -> t.getAmount() > 100.00)
            .map(t -> String.format(Locale.US, "TXN-%s:$%.2f", t.getId(), t.getAmount()))
            .collect(Collectors.toList());

        System.out.println("Verified high-value card transactions:");
        auditLogs.forEach(System.out::println);
    }
}`,
      output: `Verified high-value card transactions:
TXN-1001:$154.50
TXN-1005:$899.99`,
      explanation: `Intermediate operations \`.filter()\` and \`.map()\` transform an input stream into a specialized downstream stream. \`.filter()\` selectively admits elements based on a \`Predicate\`, while \`.map()\` applies a \`Function\` projection to each admitted element. Both intermediate operations are lazy and execute only when a terminal operation like \`.collect()\` is triggered.`
    },
    {
      id: 'ex-22-2-ex2',
      title: 'Flattening Nested Organizational Skills with flatMap',
      problemStatement: `Flatten a nested organization structure \`List<Department>\` -> \`List<Employee>\` -> \`List<String> skills\` into a single distinct, sorted list of all unique technical skills across the organization.`,
      hint: `Use \`.flatMap()\` to flatten 1-to-N relationships: \`departments.stream().flatMap(d -> d.getEmployees().stream()).flatMap(e -> e.getSkills().stream())\`.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    static class Employee {
        private final String name;
        private final List<String> skills;

        public Employee(String name, List<String> skills) {
            this.name = name;
            this.skills = skills;
        }

        public List<String> getSkills() { return skills; }
    }

    static class Department {
        private final String name;
        private final List<Employee> employees;

        public Department(String name, List<Employee> employees) {
            this.name = name;
            this.employees = employees;
        }

        public List<Employee> getEmployees() { return employees; }
    }

    public static void main(String[] args) {
        List<Department> departments = Arrays.asList(
            new Department("Platform", Arrays.asList(
                new Employee("Alice", Arrays.asList("Java", "Kubernetes", "Docker")),
                new Employee("Bob", Arrays.asList("Go", "Docker", "AWS"))
            )),
            new Department("Data", Arrays.asList(
                new Employee("Charlie", Arrays.asList("Python", "SQL", "Spark")),
                new Employee("Diana", Arrays.asList("Java", "SQL", "Kafka"))
            ))
        );

        List<String> uniqueSkills = departments.stream()
            .flatMap(d -> d.getEmployees().stream())
            .flatMap(e -> e.getSkills().stream())
            .distinct()
            .sorted()
            .collect(Collectors.toList());

        System.out.println("Organization-wide unique skills:");
        uniqueSkills.forEach(skill -> System.out.println("- " + skill));
    }
}`,
      output: `Organization-wide unique skills:
- AWS
- Docker
- Go
- Java
- Kafka
- Kubernetes
- Python
- SQL
- Spark`,
      explanation: `While \`.map()\` replaces each stream element with a single new object (1-to-1 mapping), \`.flatMap()\` replaces each element with a new stream of elements and flattens the resulting streams into a single combined stream (1-to-N flattening). Chaining \`flatMap\` traverses arbitrarily deep hierarchical models without nested loops.`
    },
    {
      id: 'ex-22-2-ex3',
      title: 'Stream Laziness and Pipeline Tracing with peek',
      problemStatement: `Prove that Java Streams execute lazily through vertical pipelining (element-by-element) rather than horizontal batching. Use \`.peek()\` to trace when elements enter filtering, mapping, and terminal operations, demonstrating short-circuit evaluation.`,
      hint: `\`peek(Consumer<T>)\` is an intermediate operation designed for debugging without modifying stream elements.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("stream", "lazy", "evaluation", "pipeline", "lambda");

        System.out.println("Starting lazy stream pipeline evaluation:");

        String result = words.stream()
            .peek(w -> System.out.println("filter-1 checking: " + w))
            .filter(w -> w.length() > 4)
            .peek(w -> System.out.println("filter-2 checking (starts with p): " + w))
            .filter(w -> w.startsWith("p"))
            .map(w -> {
                System.out.println("mapping to upper: " + w);
                return w.toUpperCase();
            })
            .findFirst()
            .orElse("NOT_FOUND");

        System.out.println("Result element: " + result);
    }
}`,
      output: `Starting lazy stream pipeline evaluation:
filter-1 checking: stream
filter-2 checking (starts with p): stream
filter-1 checking: lazy
filter-1 checking: evaluation
filter-2 checking (starts with p): evaluation
filter-1 checking: pipeline
filter-2 checking (starts with p): pipeline
mapping to upper: pipeline
Result element: PIPELINE`,
      explanation: `Streams process elements vertically: each element travels as far through the pipeline as possible before the next element is pulled. When a short-circuiting operation such as \`findFirst()\` finds a match, pipeline execution terminates immediately, skipping all remaining elements in the source collection.`
    },
    {
      id: 'ex-22-2-ex4',
      title: 'Infinite Stream Generation and Short-Circuiting',
      problemStatement: `Generate a sequence of financial Fibonacci projection multiples and exponential backoff retry delays using infinite streams \`Stream.iterate()\`. Short-circuit the infinite sequence safely using \`limit()\` and \`takeWhile()\`.`,
      hint: `\`Stream.iterate(seed, next).limit(n)\` creates bounded pipelines from infinite sources, while \`takeWhile(predicate)\` stops on condition.`,
      solutionCode: `import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        // Fibonacci sequence generation via Stream.iterate() and limit()
        List<Long> fibonacci = Stream.iterate(new long[]{0, 1}, f -> new long[]{f[1], f[0] + f[1]})
            .limit(10)
            .map(f -> f[0])
            .collect(Collectors.toList());

        System.out.println("First 10 Fibonacci numbers: " + fibonacci);

        // Exponential backoff delays up to 1600ms using takeWhile
        List<Long> backoffDelaysMs = Stream.iterate(100L, delay -> delay * 2)
            .takeWhile(delay -> delay <= 1600L)
            .collect(Collectors.toList());

        System.out.println("Retry backoff intervals (ms): " + backoffDelaysMs);
    }
}`,
      output: `First 10 Fibonacci numbers: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
Retry backoff intervals (ms): [100, 200, 400, 800, 1600]`,
      explanation: `\`Stream.iterate()\` constructs an unbounded sequence by repeatedly applying a unary operator to a seed value. Because streams are evaluated on-demand, infinite streams can be safely created provided they are bounded by short-circuiting operations such as \`limit(n)\` or Java 9 \`takeWhile(predicate)\`.`
    },
    {
      id: 'ex-22-2-ex5',
      title: 'Distinct Stream Element Deduplication with Custom Equality',
      problemStatement: `Deduplicate a stream of customer contact records where contacts are considered duplicates if they share the same normalized email address, regardless of differences in user ID or display name. Implement \`equals\` and \`hashCode\` correctly to enable \`Stream.distinct()\`.`,
      hint: `\`Stream.distinct()\` relies strictly on \`Object.equals(Object)\` and \`Object.hashCode()\` of the stream elements.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class Main {
    static class CustomerContact {
        private final int id;
        private final String name;
        private final String email;

        public CustomerContact(int id, String name, String email) {
            this.id = id;
            this.name = name;
            this.email = email;
        }

        public String getNormalizedEmail() {
            return email == null ? "" : email.trim().toLowerCase();
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof CustomerContact)) return false;
            CustomerContact that = (CustomerContact) o;
            return Objects.equals(this.getNormalizedEmail(), that.getNormalizedEmail());
        }

        @Override
        public int hashCode() {
            return Objects.hash(getNormalizedEmail());
        }

        @Override
        public String toString() {
            return String.format("Contact[id=%d, name=%s, email=%s]", id, name, email);
        }
    }

    public static void main(String[] args) {
        List<CustomerContact> contacts = Arrays.asList(
            new CustomerContact(1, "Alice Smith", "alice@example.com"),
            new CustomerContact(2, "Alice S.", "ALICE@example.com"),
            new CustomerContact(3, "Bob Vance", "bob@example.com"),
            new CustomerContact(4, "Robert Vance", "bob@example.com "),
            new CustomerContact(5, "Charlie Day", "charlie@example.com")
        );

        List<CustomerContact> deduplicated = contacts.stream()
            .distinct()
            .collect(Collectors.toList());

        System.out.println("Deduplicated customer contacts (by email):");
        deduplicated.forEach(System.out::println);
    }
}`,
      output: `Deduplicated customer contacts (by email):
Contact[id=1, name=Alice Smith, email=alice@example.com]
Contact[id=3, name=Bob Vance, email=bob@example.com]
Contact[id=5, name=Charlie Day, email=charlie@example.com]`,
      explanation: `The \`.distinct()\` intermediate operation maintains an internal hash set to filter out duplicate elements. It is stateful and relies strictly on \`equals()\` and \`hashCode()\` contract compliance. Overriding these methods to normalize keys ensures duplicate business entities are filtered effectively.`
    },
    {
      id: 'ex-22-2-ex6',
      title: 'Multi-Criteria Stream Sorting with Null-Safe Comparators',
      problemStatement: `Sort a stream of inventory items where priority values may be \`null\`. Implement a robust comparator pipeline using \`Comparator.nullsLast()\`, followed by secondary sorting by item rating descending and unit price ascending.`,
      hint: `Wrap field extractors with \`Comparator.nullsLast(Comparator.naturalOrder())\` to avoid \`NullPointerException\` during stream sorting.`,
      solutionCode: `import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

public class Main {
    static class InventoryItem {
        private final String name;
        private final Integer priority; // Can be null
        private final double rating;
        private final double price;

        public InventoryItem(String name, Integer priority, double rating, double price) {
            this.name = name;
            this.priority = priority;
            this.rating = rating;
            this.price = price;
        }

        public String getName() { return name; }
        public Integer getPriority() { return priority; }
        public double getRating() { return rating; }
        public double getPrice() { return price; }

        @Override
        public String toString() {
            return String.format(Locale.US, "%-12s Priority: %-4s Rating: %.1f Price: $%.2f",
                name, (priority == null ? "NONE" : priority.toString()), rating, price);
        }
    }

    public static void main(String[] args) {
        List<InventoryItem> items = Arrays.asList(
            new InventoryItem("Widget-A", null, 4.5, 29.99),
            new InventoryItem("Widget-B", 1, 4.8, 49.99),
            new InventoryItem("Widget-C", 2, 4.9, 19.99),
            new InventoryItem("Widget-D", 1, 4.8, 39.99),
            new InventoryItem("Widget-E", null, 4.9, 15.00),
            new InventoryItem("Widget-F", 1, 4.2, 10.00)
        );

        Comparator<InventoryItem> comparator = Comparator
            .comparing(InventoryItem::getPriority, Comparator.nullsLast(Comparator.naturalOrder()))
            .thenComparing(Comparator.comparingDouble(InventoryItem::getRating).reversed())
            .thenComparingDouble(InventoryItem::getPrice);

        System.out.println("Sorted Inventory Items (Priority nulls-last, rating desc, price asc):");
        items.stream().sorted(comparator).forEach(System.out::println);
    }
}`,
      output: `Sorted Inventory Items (Priority nulls-last, rating desc, price asc):
Widget-D     Priority: 1    Rating: 4.8 Price: $39.99
Widget-B     Priority: 1    Rating: 4.8 Price: $49.99
Widget-F     Priority: 1    Rating: 4.2 Price: $10.00
Widget-C     Priority: 2    Rating: 4.9 Price: $19.99
Widget-E     Priority: NONE Rating: 4.9 Price: $15.00
Widget-A     Priority: NONE Rating: 4.5 Price: $29.99`,
      explanation: `Directly invoking \`Comparable.compareTo\` on nullable fields throws \`NullPointerException\`. \`Comparator.nullsLast()\` handles null references safely by placing null values at the end of the sorted output. Combining this with \`reversed()\` and secondary criteria produces rock-solid sorting pipelines.`
    },
    {
      id: 'ex-22-2-ex7',
      title: 'High-Throughput Primitive IntStream Summary Statistics',
      problemStatement: `Compute summary metrics (count, sum, min, max, average) for a massive sequence of server response latency values (in milliseconds) using \`IntStream\` to avoid boxing into \`Stream<Integer>\`. Obtain all statistics in a single pass using \`summaryStatistics()\`.`,
      hint: `Convert or generate with \`IntStream\` and call \`.summaryStatistics()\` to obtain \`IntSummaryStatistics\`.`,
      solutionCode: `import java.util.Arrays;
import java.util.IntSummaryStatistics;
import java.util.Locale;

public class Main {
    public static void main(String[] args) {
        int[] latenciesMs = {120, 45, 310, 89, 240, 15, 780, 92, 110, 430};

        IntSummaryStatistics stats = Arrays.stream(latenciesMs).summaryStatistics();

        System.out.println("Server Response Latency Analysis:");
        System.out.println("- Sample Count: " + stats.getCount());
        System.out.println("- Minimum Latency: " + stats.getMin() + " ms");
        System.out.println("- Maximum Latency: " + stats.getMax() + " ms");
        System.out.printf(Locale.US, "- Average Latency: %.2f ms%n", stats.getAverage());
        System.out.println("- Total Cumulative Latency: " + stats.getSum() + " ms");
    }
}`,
      output: `Server Response Latency Analysis:
- Sample Count: 10
- Minimum Latency: 15 ms
- Maximum Latency: 780 ms
- Average Latency: 223.10 ms
- Total Cumulative Latency: 2231 ms`,
      explanation: `Primitive stream specializations (\`IntStream\`, \`LongStream\`, \`DoubleStream\`) provide high-performance numerical aggregations. The \`summaryStatistics()\` terminal operation evaluates count, sum, min, max, and arithmetic average in a single stream traversal with zero heap allocations.`
    },
    {
      id: 'ex-22-2-ex8',
      title: 'Database Record Pagination using skip and limit',
      problemStatement: `Implement an in-memory pagination engine for query results. Create a helper method \`paginate(List<T> source, int pageNumber, int pageSize)\` that returns the requested page slice using \`skip((pageNumber - 1) * pageSize).limit(pageSize)\`. Test pages 1, 2, and 3.`,
      hint: `Calculate offset as \`(page - 1) * pageSize\` and apply \`.skip(offset).limit(pageSize)\`.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    static <T> List<T> paginate(List<T> source, int pageNumber, int pageSize) {
        long offset = (long) (pageNumber - 1) * pageSize;
        return source.stream()
            .skip(offset)
            .limit(pageSize)
            .collect(Collectors.toList());
    }

    public static void main(String[] args) {
        List<String> auditLogs = Arrays.asList(
            "Log-101", "Log-102", "Log-103", "Log-104",
            "Log-105", "Log-106", "Log-107", "Log-108",
            "Log-109", "Log-110", "Log-111", "Log-112"
        );

        int pageSize = 4;
        for (int page = 1; page <= 3; page++) {
            List<String> pageItems = paginate(auditLogs, page, pageSize);
            System.out.println("Page " + page + ": " + pageItems);
        }
    }
}`,
      output: `Page 1: [Log-101, Log-102, Log-103, Log-104]
Page 2: [Log-105, Log-106, Log-107, Log-108]
Page 3: [Log-109, Log-110, Log-111, Log-112]`,
      explanation: `\`.skip(n)\` discards the first \`n\` elements of the stream, while \`.limit(maxSize)\` truncates the stream length to \`maxSize\`. Together, they implement zero-copy data windowing and pagination over any in-memory data collection or stream source.`
    },
    {
      id: 'ex-22-2-ex9',
      title: 'Stream Regex Tokenization with Pattern.splitAsStream',
      problemStatement: `Parse unstructured web server access logs using \`Pattern.compile().splitAsStream()\`. Tokenize comma-and-semicolon delimited raw data, strip leading/trailing whitespace, filter out empty tokens, and collect valid payload tokens into a clean list.`,
      hint: `\`Pattern.compile(regex).splitAsStream(CharSequence)\` creates a lazy stream of substrings matching the split pattern.`,
      solutionCode: `import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        String rawLog = "INFO:user_login,auth_success; session_id=9871 ;; WARN:rate_limit_warning, retry_after=30 ;";

        Pattern delimiterPattern = Pattern.compile("[,;]\\\\s*");

        List<String> cleanTokens = delimiterPattern.splitAsStream(rawLog)
            .map(String::trim)
            .filter(token -> !token.isEmpty())
            .collect(Collectors.toList());

        System.out.println("Extracted Log Tokens (" + cleanTokens.size() + " tokens):");
        cleanTokens.forEach(token -> System.out.println("-> " + token));
    }
}`,
      output: `Extracted Log Tokens (5 tokens):
-> INFO:user_login
-> auth_success
-> session_id=9871
-> WARN:rate_limit_warning
-> retry_after=30`,
      explanation: `\`Pattern.splitAsStream()\` bridges regular expressions and streams. Unlike \`String.split()\`, which allocates an entire \`String[]\` array upfront, \`splitAsStream()\` lazily produces matching tokens as they are demanded by downstream operations, drastically reducing peak memory overhead.`
    },
    {
      id: 'ex-22-2-ex10',
      title: 'Text Processing Pipeline: Distinct Word Frequency and Stop-Word Filter',
      problemStatement: `Build a natural language document processor. Read simulated document lines, convert to lowercase, strip punctuation, filter out common stop words ("the", "is", "a", "and", "in", "to", "of", "on"), and count the occurrences of each remaining keyword, printing results sorted alphabetically.`,
      hint: `Chain \`flatMap\` with \`Arrays.stream(line.split("\\\\W+"))\`, filter stop words, and use \`Collectors.groupingBy()\` with \`Collectors.counting()\`.`,
      solutionCode: `import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> documentLines = Arrays.asList(
            "Java 8 streams provide functional operations on streams of elements.",
            "Streams pipeline consists of a source, intermediate operations, and a terminal operation."
        );

        Set<String> stopWords = new HashSet<>(Arrays.asList("the", "is", "a", "and", "in", "to", "of", "on"));

        Map<String, Long> wordCounts = documentLines.stream()
            .flatMap(line -> Arrays.stream(line.toLowerCase().split("\\\\W+")))
            .filter(word -> !word.isEmpty() && !stopWords.contains(word))
            .collect(Collectors.groupingBy(
                word -> word,
                TreeMap::new,
                Collectors.counting()
            ));

        System.out.println("Keyword Frequency Table:");
        wordCounts.forEach((word, count) -> System.out.println(word + ": " + count));
    }
}`,
      output: `Keyword Frequency Table:
8: 1
consists: 1
elements: 1
functional: 1
intermediate: 1
java: 1
operation: 1
operations: 2
pipeline: 1
provide: 1
source: 1
streams: 3
terminal: 1`,
      explanation: `This classic MapReduce text processing pipeline demonstrates the synergy of stream operations: \`flatMap\` breaks sentences into individual words, \`filter\` removes noise, and \`Collectors.groupingBy\` with a \`TreeMap\` supplier and \`counting()\` downstream collector counts frequencies with alphabetical key sorting.`
    }
  ],

  // ── LESSON 22.3: Terminal Operations and Collectors ───────────────────────
  'terminal-operations-and-collectors': [
    {
      id: 'ex-22-3-ex1',
      title: 'Sales Order Classification with Collectors.groupingBy',
      problemStatement: `Group a stream of retail sales orders by product category (Electronics, Apparel, Groceries). Display the resulting \`Map<String, List<Order>>\` and list the order details belonging to each category.`,
      hint: `Use \`Collectors.groupingBy(Order::getCategory)\`.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class Main {
    static class Order {
        private final String id;
        private final String category;
        private final double amount;

        public Order(String id, String category, double amount) {
            this.id = id;
            this.category = category;
            this.amount = amount;
        }

        public String getId() { return id; }
        public String getCategory() { return category; }
        public double getAmount() { return amount; }

        @Override
        public String toString() { return id + " ($" + amount + ")"; }
    }

    public static void main(String[] args) {
        List<Order> orders = Arrays.asList(
            new Order("ORD-1", "Electronics", 499.99),
            new Order("ORD-2", "Apparel", 59.99),
            new Order("ORD-3", "Groceries", 25.50),
            new Order("ORD-4", "Electronics", 129.00),
            new Order("ORD-5", "Apparel", 89.50)
        );

        Map<String, List<Order>> ordersByCategory = orders.stream()
            .collect(Collectors.groupingBy(
                Order::getCategory,
                TreeMap::new,
                Collectors.toList()
            ));

        System.out.println("Orders Grouped by Category:");
        ordersByCategory.forEach((cat, list) -> System.out.println(cat + ": " + list));
    }
}`,
      output: `Orders Grouped by Category:
Apparel: [ORD-2 ($59.99), ORD-5 ($89.5)]
Electronics: [ORD-1 ($499.99), ORD-4 ($129.0)]
Groceries: [ORD-3 ($25.5)]`,
      explanation: `\`Collectors.groupingBy()\` mirrors SQL \`GROUP BY\` functionality. It partitions input elements according to a classification function and organizes them into a \`Map<K, List<V>>\`. Passing \`TreeMap::new\` guarantees sorted keys in the resulting map.`
    },
    {
      id: 'ex-22-3-ex2',
      title: 'Multi-Level Hierarchical Grouping: Department and Seniority',
      problemStatement: `Classify corporate personnel into a two-level nested map: first by department name, and second by seniority tier ("JUNIOR", "MID", "SENIOR"), collecting employee names into lists.`,
      hint: `Nest collectors: \`Collectors.groupingBy(Employee::getDepartment, Collectors.groupingBy(Employee::getTier, Collectors.mapping(Employee::getName, Collectors.toList())))\`.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class Main {
    static class Employee {
        private final String name;
        private final String department;
        private final String tier;

        public Employee(String name, String department, String tier) {
            this.name = name;
            this.department = department;
            this.tier = tier;
        }

        public String getName() { return name; }
        public String getDepartment() { return department; }
        public String getTier() { return tier; }
    }

    public static void main(String[] args) {
        List<Employee> staff = Arrays.asList(
            new Employee("Alice", "Engineering", "SENIOR"),
            new Employee("Bob", "Engineering", "MID"),
            new Employee("Charlie", "Engineering", "SENIOR"),
            new Employee("Diana", "Marketing", "MID"),
            new Employee("Evan", "Marketing", "JUNIOR")
        );

        Map<String, Map<String, List<String>>> hierarchy = staff.stream()
            .collect(Collectors.groupingBy(
                Employee::getDepartment,
                TreeMap::new,
                Collectors.groupingBy(
                    Employee::getTier,
                    TreeMap::new,
                    Collectors.mapping(Employee::getName, Collectors.toList())
                )
            ));

        System.out.println("Department Seniority Breakdown:");
        hierarchy.forEach((dept, tiers) -> {
            System.out.println("[" + dept + "]");
            tiers.forEach((tier, names) -> System.out.println("  " + tier + ": " + names));
        });
    }
}`,
      output: `Department Seniority Breakdown:
[Engineering]
  MID: [Bob]
  SENIOR: [Alice, Charlie]
[Marketing]
  JUNIOR: [Evan]
  MID: [Diana]`,
      explanation: `Nested \`groupingBy\` collectors create multi-dimensional data structures. The outer collector partitions elements by primary key (Department), while the inner collector further subdivides each partition by secondary key (Seniority Tier) and extracts only employee names via \`Collectors.mapping()\`.`
    },
    {
      id: 'ex-22-3-ex3',
      title: 'Downstream Aggregations: Summing and Averaging by Group',
      problemStatement: `Compute department-level payroll metrics. Group employees by department and calculate both total payroll (\`summingDouble\`) and average salary (\`averagingDouble\`) per department.`,
      hint: `Combine \`groupingBy\` with downstream collectors \`Collectors.summingDouble()\` and \`Collectors.averagingDouble()\`.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class Main {
    static class Employee {
        private final String name;
        private final String department;
        private final double salary;

        public Employee(String name, String department, double salary) {
            this.name = name;
            this.department = department;
            this.salary = salary;
        }

        public String getDepartment() { return department; }
        public double getSalary() { return salary; }
    }

    public static void main(String[] args) {
        List<Employee> team = Arrays.asList(
            new Employee("Alice", "Engineering", 120000.0),
            new Employee("Bob", "Engineering", 110000.0),
            new Employee("Charlie", "Sales", 85000.0),
            new Employee("Diana", "Sales", 95000.0),
            new Employee("Eve", "HR", 75000.0)
        );

        Map<String, Double> totalPayroll = team.stream()
            .collect(Collectors.groupingBy(
                Employee::getDepartment,
                TreeMap::new,
                Collectors.summingDouble(Employee::getSalary)
            ));

        Map<String, Double> avgSalary = team.stream()
            .collect(Collectors.groupingBy(
                Employee::getDepartment,
                TreeMap::new,
                Collectors.averagingDouble(Employee::getSalary)
            ));

        System.out.println("Department Payroll Statistics:");
        totalPayroll.keySet().forEach(dept -> {
            double total = totalPayroll.get(dept);
            double avg = avgSalary.get(dept);
            System.out.printf(Locale.US, "%-12s Total: $%,10.2f | Average: $%,10.2f%n", dept, total, avg);
        });
    }
}`,
      output: `Department Payroll Statistics:
Engineering  Total: $230,000.00 | Average: $115,000.00
HR           Total: $ 75,000.00 | Average: $ 75,000.00
Sales        Total: $180,000.00 | Average: $ 90,000.00`,
      explanation: `Downstream collectors allow immediate reduction of grouped elements without retaining full object lists in memory. \`summingDouble()\` and \`averagingDouble()\` aggregate numerical properties directly into scalar values for each distinct partition.`
    },
    {
      id: 'ex-22-3-ex4',
      title: 'Binary Candidate Partitioning with Collectors.partitioningBy',
      problemStatement: `Evaluate technical interview candidate scores. Partition candidates into passing (score >= 75.0) and failing (score < 75.0) lists using \`Collectors.partitioningBy()\`, downstream mapping each partition to candidate names.`,
      hint: `\`Collectors.partitioningBy(predicate, downstreamCollector)\` always produces a \`Map<Boolean, List<T>>\` with \`true\` and \`false\` keys.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Main {
    static class Candidate {
        private final String name;
        private final double score;

        public Candidate(String name, double score) {
            this.name = name;
            this.score = score;
        }

        public String getName() { return name; }
        public double getScore() { return score; }
    }

    public static void main(String[] args) {
        List<Candidate> candidates = Arrays.asList(
            new Candidate("Alice", 92.5),
            new Candidate("Bob", 68.0),
            new Candidate("Charlie", 74.5),
            new Candidate("Diana", 88.0),
            new Candidate("Evan", 60.5)
        );

        Map<Boolean, List<String>> partitioned = candidates.stream()
            .collect(Collectors.partitioningBy(
                c -> c.getScore() >= 75.0,
                Collectors.mapping(Candidate::getName, Collectors.toList())
            ));

        System.out.println("Assessment Results Partitioning:");
        System.out.println("Passed Candidates (Score >= 75): " + partitioned.get(true));
        System.out.println("Failed Candidates (Score < 75): " + partitioned.get(false));
    }
}`,
      output: `Assessment Results Partitioning:
Passed Candidates (Score >= 75): [Alice, Diana]
Failed Candidates (Score < 75): [Bob, Charlie, Evan]`,
      explanation: `\`Collectors.partitioningBy()\` is an optimized binary specialization of \`groupingBy()\`. Because the key is strictly a \`Boolean\`, it always populates both \`true\` and \`false\` keys in the resulting map, even if one of the partitions contains zero elements.`
    },
    {
      id: 'ex-22-3-ex5',
      title: 'Conflict-Resolving Map Construction with Collectors.toMap',
      problemStatement: `Build an in-memory user session cache from an un-ordered stream of login events containing duplicate user IDs. Resolve key collisions by keeping the event with the latest timestamp using the three-argument \`Collectors.toMap()\`.`,
      hint: `\`Collectors.toMap(keyMapper, valueMapper, mergeFunction)\` uses the merge function \`(existing, replacement) -> ...\` when duplicate keys are encountered.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class Main {
    static class SessionEvent {
        private final String userId;
        private final String token;
        private final long timestamp;

        public SessionEvent(String userId, String token, long timestamp) {
            this.userId = userId;
            this.token = token;
            this.timestamp = timestamp;
        }

        public String getUserId() { return userId; }
        public String getToken() { return token; }
        public long getTimestamp() { return timestamp; }

        @Override
        public String toString() { return "Token:" + token + "@" + timestamp; }
    }

    public static void main(String[] args) {
        List<SessionEvent> loginEvents = Arrays.asList(
            new SessionEvent("user-1", "tk_101", 1000L),
            new SessionEvent("user-2", "tk_201", 1050L),
            new SessionEvent("user-1", "tk_102", 1200L), // Newer session for user-1
            new SessionEvent("user-3", "tk_301", 900L),
            new SessionEvent("user-2", "tk_200", 800L)   // Older session for user-2
        );

        Map<String, SessionEvent> activeSessions = loginEvents.stream()
            .collect(Collectors.toMap(
                SessionEvent::getUserId,
                event -> event,
                (oldEvent, newEvent) -> newEvent.getTimestamp() > oldEvent.getTimestamp() ? newEvent : oldEvent,
                TreeMap::new
            ));

        System.out.println("Latest Active User Sessions:");
        activeSessions.forEach((user, session) ->
            System.out.println(user + " -> " + session));
    }
}`,
      output: `Latest Active User Sessions:
user-1 -> Token:tk_102@1200
user-2 -> Token:tk_201@1050
user-3 -> Token:tk_301@900`,
      explanation: `By default, \`Collectors.toMap()\` throws \`IllegalStateException\` on duplicate keys. Providing a binary merge function \`(existing, replacement) -> chosen\` resolves collisions deterministically. Supplying a map factory (such as \`TreeMap::new\`) controls the exact map implementation and iteration ordering.`
    },
    {
      id: 'ex-22-3-ex6',
      title: 'Structured CSV and JSON Generation with Collectors.joining',
      problemStatement: `Format query results into custom string representations. Join a stream of product SKU codes into a comma-separated values string, and format customer tags into a bracketed, delimited JSON array representation \`["tag1", "tag2", "tag3"]\`.`,
      hint: `Use \`Collectors.joining(delimiter, prefix, suffix)\` to concatenate string elements with surrounding boundaries.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> tags = Arrays.asList("java", "streams", "lambdas", "concurrency");

        // Simple delimiter joining
        String csvOutput = tags.stream()
            .collect(Collectors.joining(", "));

        // Bracketed and quoted JSON array joining
        String jsonArrayOutput = tags.stream()
            .map(tag -> "\\"" + tag + "\\"")
            .collect(Collectors.joining(", ", "[", "]"));

        System.out.println("CSV representation: " + csvOutput);
        System.out.println("JSON array representation: " + jsonArrayOutput);
    }
}`,
      output: `CSV representation: java, streams, lambdas, concurrency
JSON array representation: ["java", "streams", "lambdas", "concurrency"]`,
      explanation: `\`Collectors.joining()\` builds a single concatenated string from a stream of \`CharSequence\` elements using an internal \`StringBuilder\`. The overloaded 3-argument version \`joining(delimiter, prefix, suffix)\` eliminates manual edge-case logic for trailing commas and enclosure brackets.`
    },
    {
      id: 'ex-22-3-ex7',
      title: 'Three-Argument Numerical Reduction: Identity, Accumulator, Combiner',
      problemStatement: `Calculate the total character count across a list of sentences using the 3-argument \`Stream.reduce(identity, accumulator, combiner)\`. Understand why the combiner is necessary for parallel stream execution even when run sequentially.`,
      hint: `\`stream.reduce(0, (acc, str) -> acc + str.length(), Integer::sum)\` allows reducing elements to a different target type.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> sentences = Arrays.asList(
            "Java Streams",
            "Functional Programming",
            "Lambda Expressions"
        );

        // 3-argument reduce:
        // identity: initial integer 0
        // accumulator: (int acc, String s) -> acc + s.length()
        // combiner: (int total1, int total2) -> total1 + total2 (for parallel combining)
        int totalCharCount = sentences.stream().reduce(
            0,
            (acc, s) -> acc + s.length(),
            Integer::sum
        );

        System.out.println("Sentence length breakdown:");
        sentences.forEach(s -> System.out.println("- \\"" + s + "\\" (" + s.length() + " chars)"));
        System.out.println("Total combined characters: " + totalCharCount);
    }
}`,
      output: `Sentence length breakdown:
- "Java Streams" (12 chars)
- "Functional Programming" (22 chars)
- "Lambda Expressions" (18 chars)
Total combined characters: 52`,
      explanation: `When reducing a \`Stream<T>\` to an output type \`U\` where \`U != T\`, the 2-argument \`reduce\` is insufficient because the accumulator signature requires \`(T, T) -> T\`. The 3-argument \`reduce(U identity, BiFunction<U, T, U> accumulator, BinaryOperator<U> combiner)\` accommodates type transformations and allows parallel sub-tasks to combine their results.`
    },
    {
      id: 'ex-22-3-ex8',
      title: 'Fraud Prevention Validation with Short-Circuiting Matching',
      problemStatement: `Implement a transaction risk assessment gatekeeper using \`allMatch()\`, \`anyMatch()\`, and \`noneMatch()\`. Verify: (1) if all transactions are under the threshold limit ($10,000), (2) if any transaction originates from a sanctioned country, and (3) if no transactions have a negative dollar amount.`,
      hint: `Short-circuiting terminal operations terminate as soon as the result is determined without evaluating the rest of the stream.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;

public class Main {
    static class Payment {
        private final String id;
        private final double amount;
        private final String country;

        public Payment(String id, double amount, String country) {
            this.id = id;
            this.amount = amount;
            this.country = country;
        }

        public double getAmount() { return amount; }
        public String getCountry() { return country; }
    }

    public static void main(String[] args) {
        List<Payment> batch = Arrays.asList(
            new Payment("P-1", 1200.0, "USA"),
            new Payment("P-2", 4500.0, "DEU"),
            new Payment("P-3", 890.0, "GBR"),
            new Payment("P-4", 9500.0, "SANCTIONED_COUNTRY")
        );

        boolean allBelowLimit = batch.stream().allMatch(p -> p.getAmount() <= 10000.0);
        boolean anySanctioned = batch.stream().anyMatch(p -> "SANCTIONED_COUNTRY".equals(p.getCountry()));
        boolean noneNegative = batch.stream().noneMatch(p -> p.getAmount() < 0.0);

        System.out.println("Compliance Verification Audit:");
        System.out.println("- All transactions within limit (<= $10,000): " + allBelowLimit);
        System.out.println("- Contains sanctioned entity: " + anySanctioned);
        System.out.println("- No negative transaction values: " + noneNegative);
        System.out.println("- Batch approval status: " + (allBelowLimit && !anySanctioned && noneNegative ? "APPROVED" : "REJECTED"));
    }
}`,
      output: `Compliance Verification Audit:
- All transactions within limit (<= $10,000): true
- Contains sanctioned entity: true
- No negative transaction values: true
- Batch approval status: REJECTED`,
      explanation: `\`allMatch\`, \`anyMatch\`, and \`noneMatch\` are short-circuiting terminal operations. As soon as a single element falsifies \`allMatch\` or satisfies \`anyMatch\`, computation halts immediately without inspecting the remainder of the dataset, providing optimal algorithmic complexity.`
    },
    {
      id: 'ex-22-3-ex9',
      title: 'Immutable Collection Projection with Collectors.collectingAndThen',
      problemStatement: `Protect application cache integrity from accidental mutation. Aggregate active security roles from user definitions and transform the resulting set into an unmodifiable collection using \`Collectors.collectingAndThen(Collectors.toSet(), Collections::unmodifiableSet)\`. Verify that mutation attempts throw \`UnsupportedOperationException\`.`,
      hint: `\`Collectors.collectingAndThen(collector, finisher)\` applies a post-processing function to the result of a collector.`,
      solutionCode: `import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

public class Main {
    static class RoleRegistry {
        private final String roleName;

        public RoleRegistry(String roleName) {
            this.roleName = roleName;
        }

        public String getRoleName() { return roleName; }
    }

    public static void main(String[] args) {
        List<RoleRegistry> roles = Arrays.asList(
            new RoleRegistry("ADMIN"),
            new RoleRegistry("OPERATOR"),
            new RoleRegistry("AUDITOR"),
            new RoleRegistry("OPERATOR")
        );

        Set<String> immutableRoles = roles.stream()
            .map(RoleRegistry::getRoleName)
            .collect(Collectors.collectingAndThen(
                Collectors.toCollection(TreeSet::new),
                Collections::unmodifiableSet
            ));

        System.out.println("Extracted immutable roles: " + immutableRoles);

        try {
            immutableRoles.add("SUPERUSER");
        } catch (UnsupportedOperationException e) {
            System.out.println("Security check passed: Set is strictly immutable (caught UnsupportedOperationException).");
        }
    }
}`,
      output: `Extracted immutable roles: [ADMIN, AUDITOR, OPERATOR]
Security check passed: Set is strictly immutable (caught UnsupportedOperationException).`,
      explanation: `\`Collectors.collectingAndThen()\` wraps a primary collector and applies an immediate finishing transformation to the final collection before returning it to the caller. This provides a clean mechanism for producing defensive unmodifiable copies without boilerplate intermediate variables.`
    },
    {
      id: 'ex-22-3-ex10',
      title: 'Custom Statistical Collector with Collector.of',
      problemStatement: `Build a custom collector using \`Collector.of()\` that calculates the weighted average score of student course assignments, where each assignment has a numeric grade and a credit weight.`,
      hint: `Use a mutable container (e.g. \`double[] {totalWeightedScore, totalWeights}\`) as accumulator, combine them, and provide a finisher \`acc -> acc[1] == 0 ? 0.0 : acc[0] / acc[1]\`.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collector;

public class Main {
    static class Assignment {
        private final String name;
        private final double score;
        private final double weight;

        public Assignment(String name, double score, double weight) {
            this.name = name;
            this.score = score;
            this.weight = weight;
        }

        public double getScore() { return score; }
        public double getWeight() { return weight; }
    }

    public static void main(String[] args) {
        List<Assignment> grades = Arrays.asList(
            new Assignment("Midterm Exam", 85.0, 0.30),
            new Assignment("Final Project", 95.0, 0.40),
            new Assignment("Homework Quizzes", 90.0, 0.20),
            new Assignment("Class Participation", 100.0, 0.10)
        );

        Collector<Assignment, double[], Double> weightedAvgCollector = Collector.of(
            () -> new double[2], // [0] = weighted sum, [1] = weight sum
            (acc, a) -> {
                acc[0] += a.getScore() * a.getWeight();
                acc[1] += a.getWeight();
            },
            (acc1, acc2) -> {
                acc1[0] += acc2[0];
                acc1[1] += acc2[1];
                return acc1;
            },
            acc -> acc[1] == 0 ? 0.0 : acc[0] / acc[1]
        );

        double weightedAverage = grades.stream().collect(weightedAvgCollector);

        System.out.printf(Locale.US, "Calculated Weighted Course Average: %.2f%%%n", weightedAverage);
    }
}`,
      output: `Calculated Weighted Course Average: 91.50%`,
      explanation: `\`Collector.of()\` constructs custom collectors from four functional primitives: a supplier (creates container), an accumulator (folds an item into container), a combiner (merges two containers in parallel execution), and a finisher (transforms accumulated state to the final result).`
    }
  ],

  // ── LESSON 22.4: Optional and Parallel Streams ───────────────────────────
  'optional-and-parallel-streams': [
    {
      id: 'ex-22-4-ex1',
      title: 'Safe Deep Navigation with Optional.flatMap',
      problemStatement: `Prevent NullPointerException when traversing nested domain hierarchies: \`User\` -> \`Address\` -> \`ZipCode\`. Model the optional relationships cleanly and use \`Optional.flatMap()\` to safely navigate to the zipCode without explicit null checks.`,
      hint: `Use \`flatMap()\` when the accessor method itself returns an \`Optional<T>\`.`,
      solutionCode: `import java.util.Optional;

public class Main {
    static class Address {
        private final String street;
        private final String zipCode;

        public Address(String street, String zipCode) {
            this.street = street;
            this.zipCode = zipCode;
        }

        public Optional<String> getZipCode() {
            return Optional.ofNullable(zipCode);
        }
    }

    static class User {
        private final String name;
        private final Address address;

        public User(String name, Address address) {
            this.name = name;
            this.address = address;
        }

        public Optional<Address> getAddress() {
            return Optional.ofNullable(address);
        }

        public String getName() { return name; }
    }

    static String getZipSafely(User user) {
        return Optional.ofNullable(user)
            .flatMap(User::getAddress)
            .flatMap(Address::getZipCode)
            .orElse("ZIP_NOT_PROVIDED");
    }

    public static void main(String[] args) {
        User user1 = new User("Alice", new Address("123 Tech Way", "94016"));
        User user2 = new User("Bob", new Address("456 Rural Lane", null));
        User user3 = new User("Charlie", null);

        System.out.println(user1.getName() + " Zip: " + getZipSafely(user1));
        System.out.println(user2.getName() + " Zip: " + getZipSafely(user2));
        System.out.println(user3.getName() + " Zip: " + getZipSafely(user3));
    }
}`,
      output: `Alice Zip: 94016
Bob Zip: ZIP_NOT_PROVIDED
Charlie Zip: ZIP_NOT_PROVIDED`,
      explanation: `Using \`.map()\` on a method that returns \`Optional<T>\` results in a nested \`Optional<Optional<T>>\`. \`Optional.flatMap()\` automatically unrolls the nested Optional, flattening the hierarchy and safely short-circuiting to \`Optional.empty()\` if any intermediate reference is null or absent.`
    },
    {
      id: 'ex-22-4-ex2',
      title: 'Configuration Loader: orElse vs orElseGet Execution Semantics',
      problemStatement: `Demonstrate the critical performance and side-effect pitfall between \`orElse()\` and \`orElseGet()\`. Show that \`orElse()\` eagerly evaluates its default value argument even when the \`Optional\` is present, whereas \`orElseGet()\` evaluates lazily only when empty.`,
      hint: `\`orElse(T other)\` evaluates eagerly; \`orElseGet(Supplier<? extends T> supplier)\` evaluates lazily on demand.`,
      solutionCode: `import java.util.Optional;

public class Main {
    static String computeExpensiveFallback() {
        System.out.println("  [LOG] Computing expensive default configuration...");
        return "DEFAULT_PRODUCTION_CONFIG";
    }

    public static void main(String[] args) {
        Optional<String> activeConfig = Optional.of("CUSTOM_CLUSTER_CONFIG");
        Optional<String> missingConfig = Optional.empty();

        System.out.println("Testing orElse() on present Optional:");
        String res1 = activeConfig.orElse(computeExpensiveFallback());
        System.out.println("Result: " + res1);

        System.out.println("\\nTesting orElseGet() on present Optional:");
        String res2 = activeConfig.orElseGet(Main::computeExpensiveFallback);
        System.out.println("Result: " + res2);

        System.out.println("\\nTesting orElseGet() on empty Optional:");
        String res3 = missingConfig.orElseGet(Main::computeExpensiveFallback);
        System.out.println("Result: " + res3);
    }
}`,
      output: `Testing orElse() on present Optional:
  [LOG] Computing expensive default configuration...
Result: CUSTOM_CLUSTER_CONFIG

Testing orElseGet() on present Optional:
Result: CUSTOM_CLUSTER_CONFIG

Testing orElseGet() on empty Optional:
  [LOG] Computing expensive default configuration...
Result: DEFAULT_PRODUCTION_CONFIG`,
      explanation: `Because Java evaluates method arguments before calling the method, \`orElse(computeExpensiveFallback())\` executes the fallback method every single time, even if the Optional already contains a value. In contrast, \`orElseGet(Supplier)\` passes a lazy lambda supplier, executing only if the Optional is empty.`
    },
    {
      id: 'ex-22-4-ex3',
      title: 'Conditional Email Dispatch with ifPresent and ifPresentOrElse',
      problemStatement: `Implement an alert notification service that conditionally dispatches emails when recipient contact information is present, or logs a warning when the contact information is missing using Java 9 \`Optional.ifPresentOrElse()\`.`,
      hint: `\`optional.ifPresentOrElse(Consumer<? super T> action, Runnable emptyAction)\` handles both branches in a functional manner.`,
      solutionCode: `import java.util.Optional;

public class Main {
    static Optional<String> findContactEmail(String username) {
        if ("alice".equalsIgnoreCase(username)) {
            return Optional.of("alice@enterprise.com");
        }
        return Optional.empty();
    }

    public static void main(String[] args) {
        String[] targets = {"alice", "unknown_user"};

        for (String user : targets) {
            Optional<String> emailOpt = findContactEmail(user);

            System.out.println("Processing alert for: " + user);
            emailOpt.ifPresentOrElse(
                email -> System.out.println("  -> Dispatching email alert to: " + email),
                () -> System.out.println("  -> Warning: No contact email registered for user.")
            );
        }
    }
}`,
      output: `Processing alert for: alice
  -> Dispatching email alert to: alice@enterprise.com
Processing alert for: unknown_user
  -> Warning: No contact email registered for user.`,
      explanation: `Before Java 9, reacting to both the presence and absence of an Optional required an imperative \`if (opt.isPresent()) ... else ...\`. \`Optional.ifPresentOrElse(Consumer, Runnable)\` provides a functional syntax taking an action consumer for present values and an empty action runnable when absent.`
    },
    {
      id: 'ex-22-4-ex4',
      title: 'REST Entity Retrieval with orElseThrow and Custom Exceptions',
      problemStatement: `Simulate a REST API service lookup for database entities. When a requested record ID is not found, throw a custom business exception \`ResourceNotFoundException\` using \`Optional.orElseThrow()\`, and catch it in the caller controller to generate an HTTP 404 response payload.`,
      hint: `\`optional.orElseThrow(() -> new ResourceNotFoundException("Entity not found: " + id))\` propagates custom business errors.`,
      solutionCode: `import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class Main {
    static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }

    static class UserRepository {
        private final Map<String, String> db = new HashMap<>();

        public UserRepository() {
            db.put("usr-101", "Alice Admin");
            db.put("usr-102", "Bob Developer");
        }

        public Optional<String> findById(String id) {
            return Optional.ofNullable(db.get(id));
        }
    }

    static void handleApiRequest(UserRepository repo, String id) {
        try {
            String user = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User entity not found with id: " + id));
            System.out.println("HTTP 200 OK: " + user);
        } catch (ResourceNotFoundException e) {
            System.out.println("HTTP 404 NOT FOUND: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        UserRepository repo = new UserRepository();
        handleApiRequest(repo, "usr-101");
        handleApiRequest(repo, "usr-999");
    }
}`,
      output: `HTTP 200 OK: Alice Admin
HTTP 404 NOT FOUND: User entity not found with id: usr-999`,
      explanation: `\`Optional.orElseThrow(Supplier<? extends X>)\` bridges functional null-safety with classic exception propagation. If the entity is absent, it immediately triggers the supplier to construct and throw a domain-specific exception, commonly mapped to HTTP 404 in REST controllers.`
    },
    {
      id: 'ex-22-4-ex5',
      title: 'Optional Stream Unrolling with Java 9+ Optional.stream',
      problemStatement: `Process a collection of customer account IDs where looking up the account loyalty profile returns \`Optional<LoyaltyProfile>\`. Unroll and unwrap the stream of Optionals into a flat stream of present values using Java 9 \`Optional::stream\`.`,
      hint: `\`stream.map(this::findProfile).flatMap(Optional::stream)\` cleanly filters out empty Optionals and extracts present values in a single step.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class Main {
    static class LoyaltyTier {
        private final String accountId;
        private final String tierName;

        public LoyaltyTier(String accountId, String tierName) {
            this.accountId = accountId;
            this.tierName = tierName;
        }

        @Override
        public String toString() { return accountId + " (" + tierName + ")"; }
    }

    static Optional<LoyaltyTier> findTier(String accountId) {
        if ("ACC-1".equals(accountId)) return Optional.of(new LoyaltyTier(accountId, "PLATINUM"));
        if ("ACC-3".equals(accountId)) return Optional.of(new LoyaltyTier(accountId, "GOLD"));
        return Optional.empty(); // ACC-2 and ACC-4 have no loyalty profile
    }

    public static void main(String[] args) {
        List<String> accountIds = Arrays.asList("ACC-1", "ACC-2", "ACC-3", "ACC-4");

        // Java 9+ Optional.stream() allows flatMapping Optionals cleanly
        List<LoyaltyTier> activeTiers = accountIds.stream()
            .map(Main::findTier)
            .flatMap(Optional::stream)
            .collect(Collectors.toList());

        System.out.println("Active Loyalty Accounts Found (" + activeTiers.size() + "):");
        activeTiers.forEach(t -> System.out.println("- " + t));
    }
}`,
      output: `Active Loyalty Accounts Found (2):
- ACC-1 (PLATINUM)
- ACC-3 (GOLD)`,
      explanation: `Java 9 introduced \`Optional.stream()\`, which converts an \`Optional<T>\` into a zero-or-one element \`Stream<T>\`. When chained with \`.flatMap(Optional::stream)\`, it simultaneously filters out empty elements and unwraps present values without cumbersome \`filter(Optional::isPresent).map(Optional::get)\` chains.`
    },
    {
      id: 'ex-22-4-ex6',
      title: 'Parallel Stream Benchmark and Speedup on Prime Sieve',
      problemStatement: `Verify computational correctness and benchmark counting prime numbers in a large integer range [1, 50_000] using \`parallelStream()\` versus sequential \`stream()\`. Ensure the algorithm is deterministic and displays the matching prime count for both modes.`,
      hint: `Use \`IntStream.rangeClosed(2, limit).parallel().filter(Main::isPrime).count()\` to distribute work across available CPU cores.`,
      solutionCode: `import java.util.stream.IntStream;

public class Main {
    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        int upperLimit = 50_000;

        long seqCount = IntStream.rangeClosed(1, upperLimit)
            .filter(Main::isPrime)
            .count();

        long parCount = IntStream.rangeClosed(1, upperLimit)
            .parallel()
            .filter(Main::isPrime)
            .count();

        System.out.println("Prime Count Analysis for range [1, " + upperLimit + "]:");
        System.out.println("- Sequential prime count: " + seqCount);
        System.out.println("- Parallel prime count: " + parCount);
        System.out.println("- Verified identical results: " + (seqCount == parCount));
    }
}`,
      output: `Prime Count Analysis for range [1, 50000]:
- Sequential prime count: 5133
- Parallel prime count: 5133
- Verified identical results: true`,
      explanation: `Parallel streams utilize the ForkJoin framework to recursively split data sources and process subsets concurrently across available CPU cores. CPU-bound, stateless, and side-effect-free algorithms (like prime testing) scale almost linearly with core counts while guaranteeing identical reduction results.`
    },
    {
      id: 'ex-22-4-ex7',
      title: 'Fixing Race Conditions in Parallel Streams with Safe Collectors',
      problemStatement: `Demonstrate a common concurrency anti-pattern where a shared mutable \`ArrayList\` is modified inside a \`parallelStream().forEach(...)\`, resulting in race conditions, lost updates, or corrupted state. Fix the bug by refactoring the pipeline to use thread-safe \`Collectors.toList()\`.`,
      hint: `Never mutate shared collections from within stream operations; use reduction collectors like \`collect(Collectors.toList())\` which are thread-safe by design.`,
      solutionCode: `import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Main {
    public static void main(String[] args) {
        int totalItems = 1000;

        // SAFE IDIOM: Collectors.toList() handles concurrent partitioning and merging safely
        List<Integer> safeList = IntStream.rangeClosed(1, totalItems)
            .parallel()
            .filter(n -> n % 2 == 0)
            .boxed()
            .collect(Collectors.toList());

        System.out.println("Safe Parallel Collection Results:");
        System.out.println("- Total even numbers generated: " + safeList.size());
        System.out.println("- Expected count: " + (totalItems / 2));
        System.out.println("- Thread-safety invariant held: " + (safeList.size() == totalItems / 2));
    }
}`,
      output: `Safe Parallel Collection Results:
- Total even numbers generated: 500
- Expected count: 500
- Thread-safety invariant held: true`,
      explanation: `Mutating shared external state (such as adding to an unsynchronized \`ArrayList\`) from inside \`.parallelStream().forEach()\` violates thread safety, causing race conditions, corrupted internal arrays, and silent data loss. Using \`collect(Collectors.toList())\` creates independent sub-lists per thread and merges them safely according to the collector contract.`
    },
    {
      id: 'ex-22-4-ex8',
      title: 'Thread-Safe Parallel Word Count Reduction with groupingByConcurrent',
      problemStatement: `Implement a parallel text frequency counter that splits a corpus into words and aggregates word frequencies using a parallel stream reduction into a \`ConcurrentMap\` via \`Collectors.groupingByConcurrent()\`.`,
      hint: `\`Collectors.groupingByConcurrent()\` utilizes concurrent hash tables (\`ConcurrentHashMap\`) for lock-free parallel downstream accumulation.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentMap;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> logMessages = Arrays.asList(
            "error connection timeout",
            "info server started successfully",
            "error database connection failed",
            "warn high memory usage",
            "info server healthy"
        );

        ConcurrentMap<String, Long> frequencyMap = logMessages.parallelStream()
            .flatMap(msg -> Arrays.stream(msg.split("\\\\s+")))
            .collect(Collectors.groupingByConcurrent(
                word -> word,
                Collectors.counting()
            ));

        System.out.println("Parallel Aggregated Log Word Frequencies:");
        // Print in sorted order for deterministic output
        new TreeMap<>(frequencyMap).forEach((word, count) ->
            System.out.println(word + ": " + count));
    }
}`,
      output: `Parallel Aggregated Log Word Frequencies:
connection: 2
database: 1
error: 2
failed: 1
healthy: 1
high: 1
info: 2
memory: 1
server: 2
started: 1
successfully: 1
timeout: 1
usage: 1
warn: 1`,
      explanation: `Standard \`groupingBy()\` creates multiple intermediate sub-maps per thread that must be merged together at the end. For high-concurrency workloads, \`groupingByConcurrent()\` feeds items directly into a shared thread-safe \`ConcurrentHashMap\`, avoiding map merge overhead in exchange for concurrent bucket synchronization.`
    },
    {
      id: 'ex-22-4-ex9',
      title: 'Isolated Parallel Stream Execution with Custom ForkJoinPool',
      problemStatement: `By default, \`parallelStream()\` runs on the shared common \`ForkJoinPool.commonPool()\`, which can lead to thread starvation if blocking IO tasks are executed. Isolate CPU-heavy stream processing within a custom \`ForkJoinPool\` with a dedicated parallelism level.`,
      hint: `Execute the parallel stream inside \`customPool.submit(() -> stream.parallel()...).get()\`.`,
      solutionCode: `import java.util.concurrent.ExecutionException;
import java.util.concurrent.ForkJoinPool;
import java.util.stream.LongStream;

public class Main {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        int customParallelism = 4;
        ForkJoinPool customPool = new ForkJoinPool(customParallelism);

        try {
            long sum = customPool.submit(() -> {
                return LongStream.rangeClosed(1, 100_000L)
                    .parallel()
                    .filter(n -> n % 2 == 0)
                    .sum();
            }).get();

            System.out.println("Custom ForkJoinPool Execution Results:");
            System.out.println("- Dedicated parallelism level: " + customPool.getParallelism());
            System.out.println("- Calculated sum of even numbers: " + sum);
            System.out.println("- Custom pool active: " + !customPool.isShutdown());
        } finally {
            customPool.shutdown();
        }
    }
}`,
      output: `Custom ForkJoinPool Execution Results:
- Dedicated parallelism level: 4
- Calculated sum of even numbers: 2500050000
- Custom pool active: true`,
      explanation: `The default \`ForkJoinPool.commonPool()\` is shared across the entire JVM runtime. If any task blocks or saturates common pool threads, other unrelated parallel streams in the application stall. Submitting the parallel stream evaluation from inside a dedicated \`ForkJoinPool\` binds worker threads to that specific pool.`
    },
    {
      id: 'ex-22-4-ex10',
      title: 'Preserving Sequence Order in Parallel Streams: forEach vs forEachOrdered',
      problemStatement: `Demonstrate the behavioral difference between \`forEach()\` and \`forEachOrdered()\` when consuming an ordered parallel stream. Show that while \`forEach()\` prints elements in non-deterministic worker-thread completion order, \`forEachOrdered()\` guarantees encounter order preservation.`,
      hint: `Use \`forEachOrdered()\` when downstream consumption must respect the stream encounter order regardless of parallel execution.`,
      solutionCode: `import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> pipelineStages = Arrays.asList(
            "Stage 1: Validation",
            "Stage 2: Authentication",
            "Stage 3: Business Logic",
            "Stage 4: Database Persistence",
            "Stage 5: Notification"
        );

        System.out.println("Parallel execution with forEachOrdered (Guaranteed Order):");
        pipelineStages.parallelStream()
            .forEachOrdered(stage -> System.out.println("-> " + stage));
    }
}`,
      output: `Parallel execution with forEachOrdered (Guaranteed Order):
-> Stage 1: Validation
-> Stage 2: Authentication
-> Stage 3: Business Logic
-> Stage 4: Database Persistence
-> Stage 5: Notification`,
      explanation: `In parallel stream pipelines, \`.forEach()\` executes the consumer on worker threads as soon as each chunk finishes, resulting in non-deterministic encounter order. In contrast, \`.forEachOrdered()\` coordinates across worker threads to process terminal actions strictly in encounter order, maintaining sequential fidelity at minimal coordination cost.`
    }
  ]
};
