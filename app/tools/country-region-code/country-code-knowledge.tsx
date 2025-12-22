export function CountryCodeKnowledge() {
  return (
    <div className="max-w-none prose prose-sm dark:prose-invert">
      <div className="space-y-6 p-6">
        <section>
          <h3 className="font-semibold text-lg mb-3">
            What are Country Codes?
          </h3>
          <p className="text-muted-foreground">
            Country codes are standardized codes used to represent countries and
            their subdivisions. They are essential for international
            communication, commerce, and data exchange. The most widely used
            standards are defined by the International Organization for
            Standardization (ISO).
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-3">ISO 3166 Standards</h3>
          <div className="space-y-3">
            <div>
              <strong className="text-foreground">ISO 3166-1 Alpha-2</strong>
              <p className="mt-1 text-muted-foreground">
                Two-letter country codes (e.g., US, GB, JP). Most commonly used
                in domain names, passports, and international vehicle
                registration plates. Widely adopted across the internet and
                software systems.
              </p>
            </div>
            <div>
              <strong className="text-foreground">ISO 3166-1 Alpha-3</strong>
              <p className="mt-1 text-muted-foreground">
                Three-letter country codes (e.g., USA, GBR, JPN). More
                recognizable and less prone to confusion. Used in currency
                codes, flight booking systems, and international trade
                documentation.
              </p>
            </div>
            <div>
              <strong className="text-foreground">ISO 3166-1 Numeric</strong>
              <p className="mt-1 text-muted-foreground">
                Three-digit country codes (e.g., 840, 826, 392). Independent of
                language and writing systems. Useful in systems where letters
                might cause encoding issues.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-3">
            International Calling Codes
          </h3>
          <p className="text-muted-foreground">
            Also known as country dialing codes or IDD (International Direct
            Dialing) codes. These are telephone number prefixes used when
            calling from one country to another. Format: + followed by 1-3
            digits (e.g., +1 for US/Canada, +44 for UK, +86 for China).
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-3">Common Use Cases</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Web Development:</strong>{" "}
              Country selection dropdowns, address forms, localization
            </li>
            <li>
              <strong className="text-foreground">E-commerce:</strong> Shipping
              destinations, tax calculations, payment processing
            </li>
            <li>
              <strong className="text-foreground">Telecommunications:</strong>{" "}
              International calling, SMS routing, phone number validation
            </li>
            <li>
              <strong className="text-foreground">Travel:</strong> Passport
              validation, visa requirements, flight bookings
            </li>
            <li>
              <strong className="text-foreground">Banking:</strong> IBAN codes,
              international transfers, currency conversion
            </li>
            <li>
              <strong className="text-foreground">Analytics:</strong> User
              geolocation, market segmentation, regional statistics
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-3">Currency Codes</h3>
          <p className="text-muted-foreground">
            Currency codes follow the ISO 4217 standard. They consist of three
            letters: the first two letters represent the country code (ISO
            3166-1 Alpha-2), and the third letter represents the currency name
            (e.g., USD = US Dollar, EUR = Euro, JPY = Japanese Yen).
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-3">Important Notes</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              Country codes are case-insensitive but typically written in
              uppercase
            </li>
            <li>
              Some territories and regions have their own codes separate from
              their parent countries
            </li>
            <li>
              Historical codes may be reserved even after countries change names
              or cease to exist
            </li>
            <li>
              Multiple countries may share the same calling code (e.g., +1 for
              US, Canada, and Caribbean nations)
            </li>
            <li>
              Always use official ISO standards for critical applications like
              legal documents or financial transactions
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-3">Resources</h3>
          <p className="text-muted-foreground">
            For the complete and official list of country codes, refer to:
          </p>
          <ul className="space-y-1 mt-2 text-muted-foreground">
            <li>ISO 3166 Maintenance Agency (ISO.org)</li>
            <li>International Telecommunication Union (ITU)</li>
            <li>United Nations Statistics Division</li>
            <li>Internet Assigned Numbers Authority (IANA)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
